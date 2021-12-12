SHELL = /bin/bash

ENV=staging
GOOGLE_PROJECT_ID=core-nomad-280516
DEPLOYMENT=front
LANDING_MODE_ENABLED=false
UNREAD_NOTIFICATIONS_FETCH_INTERVAL=10000
UNREAD_MESSAGES_FETCH_INTERVAL=10000
TAG=$$(date +'%Y%m%d-%H%M%S')

BOLD=$(shell tput bold)
RED=$(shell tput setaf 1)
GREEN=$(shell tput setaf 2)
YELLOW=$(shell tput setaf 3)
RESET=$(shell tput sgr0)

ifeq ($(ENV),staging)
	VALID_ENV = true
endif

ifeq ($(ENV),production)
	VALID_ENV = true
endif

ifndef VALID_ENV
$(error \
	ENV value is $(RED)invalid$(RESET). \
	List of available environments: $(GREEN)staging$(RESET), $(GREEN)production$(RESET))
endif

.PHONY: docker-deploy #	Deploy docker images
docker-deploy:
	gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://eu.gcr.io

	docker pull eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)-builder || true
	docker pull eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV) || true

	docker build \
		--target Builder \
		--cache-from eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)-builder \
		--build-arg API_SERVER_URL=$(API_SERVER_URL) \
		--build-arg LANDING_MODE_ENABLED=$(LANDING_MODE_ENABLED) \
		--build-arg UNREAD_NOTIFICATIONS_FETCH_INTERVAL=$(UNREAD_NOTIFICATIONS_FETCH_INTERVAL) \
		--build-arg UNREAD_MESSAGES_FETCH_INTERVAL=$(UNREAD_MESSAGES_FETCH_INTERVAL) \
		--build-arg GOOGLE_APP_ID=$(GOOGLE_APP_ID) \
		--build-arg GOOGLE_APP_KEY=$(GOOGLE_APP_KEY) \
		-t eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)-builder .

	docker tag eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)-builder eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)-builder:latest
	docker push eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)-builder

	docker build \
		--target Final \
		--cache-from eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)-builder \
		--cache-from eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV) \
		--build-arg API_SERVER_URL=$(API_SERVER_URL) \
		--build-arg LANDING_MODE_ENABLED=$(LANDING_MODE_ENABLED) \
		--build-arg UNREAD_NOTIFICATIONS_FETCH_INTERVAL=$(UNREAD_NOTIFICATIONS_FETCH_INTERVAL) \
		--build-arg UNREAD_MESSAGES_FETCH_INTERVAL=$(UNREAD_MESSAGES_FETCH_INTERVAL) \
		--build-arg GOOGLE_APP_ID=$(GOOGLE_APP_ID) \
		--build-arg GOOGLE_APP_KEY=$(GOOGLE_APP_KEY) \
		-t eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV) .

	docker tag eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV) eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV):latest
	docker tag eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV) eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV):$(TAG)
	docker push eu.gcr.io/$(GOOGLE_PROJECT_ID)/$(DEPLOYMENT)-$(ENV)

.PHONY: apply-k8s #	Apply deployments, jobs, services, cluster ips
apply-k8s:
	$(MAKE) gcloud-cluster
	kubectl apply -f .deploy/k8s/$(ENV)/app

.PHONY: docker-update #	Update docker images
docker-update:
	kubectl set image deployments/$(DEPLOYMENT)-deployment \
		$(DEPLOYMENT)=eu.gcr.io/${GOOGLE_PROJECT_ID}/$(DEPLOYMENT)-$(ENV):${TAG}

.PHONY: rollout-status #	Rollout status
rollout-status:
	@for i in $(shell kubectl get -o name deployments); do \
		kubectl rollout status $$i -w; \
	done

.PHONY: gcloud-cluster #	Get current gcloud cluster
gcloud-cluster:
	gcloud container clusters get-credentials $(ENV)-cluster --zone us-east1-c --project $(GOOGLE_PROJECT_ID)

help:
	@printf "$(GREEN)Makefile$(RESET) by default running on $(GREEN)staging$(RESET) environment\n\n"
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) #\(.*\)/$(YELLOW)\1$(RESET) \2/' | expand -t30

.DEFAULT_GOAL := help

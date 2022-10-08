PROJECT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
PROJECT_NAME := wolkenpinsel

define package
	cd $(PROJECT_DIR)/dist && zip -r -FS $(PROJECT_DIR)/$(PROJECT_NAME)-$(1)-${release_tag}.$(2) *
endef

build:
	npm run build

build-v3:
	mv $(PROJECT_DIR)/src/manifest.json $(PROJECT_DIR)/src/manifest.json.tmp
	jq '.manifest_version = 3 | del(.browser_specific_settings)' $(PROJECT_DIR)/src/manifest.json.tmp > $(PROJECT_DIR)/src/manifest.json
	$(MAKE) build
	mv $(PROJECT_DIR)/src/manifest.json.tmp $(PROJECT_DIR)/src/manifest.json

package-firefox:
	[[ ! -z "$(release_tag)" ]]
	$(call package,firefox,xpi)

package-chrome:
	[[ ! -z "$(release_tag)" ]]
	$(call package,chrome,zip)

build-firefox: build package-firefox

build-chrome: build-v3 package-chrome

release:
	[[ ! -z "$(release_tag)" ]]
	git tag $(release_tag)
	tmpfile=$(shell mktemp) && jq '.version = "$(release_tag)"' $(PROJECT_DIR)/package.json > $${tmpfile} && mv $${tmpfile} $(PROJECT_DIR)/package.json

full-release: release build-firefox build-chrome

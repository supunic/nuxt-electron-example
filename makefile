run:
	yarn dev:main
	yarn dev:electron

nuxt:
	yarn dev:renderer

build-stg-mac:
	yarn build:stg:main
	yarn build:stg:renderer
	yarn build:stg:mac

build-prd-mac:
	yarn build:prd:main
	yarn build:prd:renderer
	yarn build:prd:mac

build-stg-win:
	yarn build:stg:main
	yarn build:stg:renderer
	yarn build:stg:win

build-prd-win:
	yarn build:prd:main
	yarn build:prd:renderer
	yarn build:prd:win

clean:
	yarn clean

test:
	yarn test

lint:
	yarn lint

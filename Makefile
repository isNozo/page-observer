all:
	elm make src/Background.elm src/Content.elm --output=dist/elm.js
	cp src/background.js src/content.js src/manifest.json dist/

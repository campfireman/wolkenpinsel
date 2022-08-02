PROJECT_DIR=$(dirname $(dirname "${0}"))

mkdir -p "${PROJECT_DIR}/dist"
zip -r -FS "${PROJECT_DIR}/dist/release.xpi" * --exclude "*.git*" "*.sh"
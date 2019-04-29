const rootStyles = window.getComputedStyle(document.documentElement)

if (rootStyles.getPropertyValue('--boook-cover-width') != null && rootStyles.getPropertyValue('--boook-cover-width')!= '') {
  ready()
} else {
  document.getElementById('main-css').addEventListener('load',ready)
}
function ready() {
  const coverwidth = parseFloat(rootStyles.getPropertyValue('--boook-cover-width'))
  const aspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
  const coverHeight = parseFloat(rootStyles.getPropertyValue('--book-cover-height'))
  
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )
  
  FilePond.setOptions({
    stylePanelAspectRatio: 1/aspectRatio,
    imageResizeTargetWidth: coverwidth,
    imageResizeTargetHeight:coverHeight 
  })
  
  FilePond.parse(document.body);
}

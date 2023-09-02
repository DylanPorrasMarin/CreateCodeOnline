import './style.css'

import Split from 'split-grid'

const $ = selector => document.querySelector(selector)




Split({
  minSize: 300,
  snapOffset: 0,
  columnGutters: [{
      track: 1,
      element: $('.gutter-col-1'),
  }],
  rowGutters: [{
      track: 1,
      element: $('.gutter-row-1'),
  }]
})

const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

$js.addEventListener('input', update)
$css.addEventListener('input', update)
$html.addEventListener('input', update)

function init() {
  const { pathname } = window.location;
  if (pathname) {
    const [rawhHtml, rawCss, rawJs] = pathname.slice(1).split('%7C');
    console.log({rawhHtml, rawCss, rawJs})
 
    const html = window.atob(rawhHtml)
    const css = window.atob(rawCss)
    const js = window.atob(rawJs)



    $html.value = html
    $css.value = css
    $js.value = js

    const htmlForPreview = createHtml({html, js, css})

    $('iframe').setAttribute('srcdoc', htmlForPreview);
  }
}

function update (){
  
  const html = $html.value
  const css = $css.value
  const js = $js.value

  const hashedcode = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`
 
  console.log(hashedcode)
  window.history.replaceState(null,null, `/${hashedcode}`)


  const htmlForPreview = createHtml({html,js,css})
  
  $('iframe').setAttribute('srcdoc', htmlForPreview)
} 


const createHtml = ({html,js, css}) =>{
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
    <style>
    ${css}
    </style>
    </head>
    <body>
      ${html}
      <script>
      ${js}
      </script>
    </body>
   
  </html>
  `
}

init()

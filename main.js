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


function update (){
  
  let html = $html.value
  const css = $css.value
  const js = $js.value

  const hashedcode = `${window.btoa(html)} | ${window.btoa(css)} | ${window.btoa(js)}`

  history.replaceState(null,null, `/${hashedcode}`)


  html = createHtml({html,js,css})
  
  $('iframe').setAttribute('srcdoc', html)
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


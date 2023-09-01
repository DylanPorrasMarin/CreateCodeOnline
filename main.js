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
  const html = createHtml()
  
  $('iframe').setAttribute('srcdoc', html)
} 

const createHtml = () =>{
  const html = $html.value
  const css = $css.value
  const js = $js.value

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


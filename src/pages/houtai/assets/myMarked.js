import marked from 'marked'

// marked 自定义语法
let renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  let escapedText = text.replace(/[^\w]+/g, '-');
  return '<h' + level + '><a name="' +
          escapedText +
          '" class="anchor" href="#' +
          escapedText +
          '"><span class="header-link"></span></a>' +
          text + '</h' + level + '>';
}

export default renderer
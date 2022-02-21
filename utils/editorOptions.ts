// editor options
const options: any = {
  showPathLabel: false,
  minHeight: '50vh',
  maxHeight: 'auto',
  placeholder: 'Enter Your Text Here ...',
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    // '/', // Line break
    ['outdent', 'indent'],
    ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['preview', 'print'],
    ['fullScreen', 'showBlocks', 'codeView'],
    // ['save'],
  ],
  paragraphStyles: [
    'spaced',
    'bordered',
    'neon',
    {
      name: 'Bg Dark',
      class: 'prism-code',
    },
  ],
  formats: [
    'p',
    'blockquote',
    'pre',
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ],
  font: [
    'Arial',
    'Calibri',
    'Comic Sans',
    'Courier',
    'Garamond',
    'Georgia',
    'Impact',
    'Lucida Console',
    'Palatino Linotype',
    'Segoe UI',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
  ],
};
export default options;

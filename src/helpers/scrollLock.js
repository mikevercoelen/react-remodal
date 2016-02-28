import getScrollbarWidth from 'scrollbar-width'

const IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform)

export function lock () {
  if (IS_IOS) {
    return
  }

  const paddingRight = getScrollbarWidth(true)
  document.body.setAttribute('style', `
    overflow: hidden;
    -ms-touch-action: none;
    touch-action: none;
    padding-right: ${paddingRight}px;
  `)
}

export function unlock () {
  if (IS_IOS) {
    return
  }

  document.body.setAttribute('style', '')
}

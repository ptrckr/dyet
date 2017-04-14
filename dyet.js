function dyet()
{
  var previousEmote = ':Đ',
      parentNode,
      rootNode,
      x1,
      y1,
      x2 = document.body.clientWidth / 2,
      y2 = document.body.clientHeight / 100 * 40
  
  function init(settings)
  {
    parentNode = settings.parentNode
    rootNode = settings.rootEmote
        
    attachListener()
  }
  
  function attachListener()
  {
    document.body.addEventListener('mousemove', applyRotation, false)
    document.body.addEventListener('mousedown', spawnChild, false)
    document.body.addEventListener('mousedown', changeEmote, false)
  }
  
  function getAngle(y, x)
  {
    return Math.atan2(y2 - y, x2 - x) * 180 / Math.PI
  }
  
  function applyRotation(e)
  {
    if (e !== undefined) {
      x1 = e.clientX
      y1 = e.clientY
    }
    
    var ang = getAngle(y1, x1)
     
    rootNode.style.transform = 'rotate(' + ang + 'deg)'
  }
  
  function getEmote()
  {
    var eyes = [':', ';', '='],
        noses = ['*', '^', '-', '~', '˙', '·', '`', '"'],
        mouth = 'Đ'
    
    var eye = eyes[Math.floor(Math.random() * eyes.length)], 
        nose_probability = 0.3,
        nose = ''
        
    if (Math.random() < nose_probability)
      nose = noses[Math.floor(Math.random() * noses.length)]
            
    return eye + nose + mouth 
  }
  
  function changeEmote()
  {
    var emote = getEmote()
    
    previousEmote = emote
    rootNode.innerText = emote
  }
  
  function spawnChild()
  {
    var child = document.createElement('div'),
        childText = document.createTextNode(previousEmote)
    
    child.setAttribute('class', 'dyet')
    child.style.transform = 'rotate(' + getAngle(y1, x1) + 'deg)'
    child.appendChild(childText)
    parentNode.appendChild(child)

    setTimeout(function() {
      child.classList.add('decay')
    }, 1)
    
    setTimeout(function() {
      child.parentNode.removeChild(child)
    }, 1500)
  }
  
  return {
    init: init
  }
}

var Dyet = dyet(),
    settings = {
      parentNode: document.querySelector('.dyet_wrapper'),
      rootEmote: document.querySelector('.dyet')
    }

Dyet.init(settings)

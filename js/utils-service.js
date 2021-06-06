var gStylePrefs
var seasons=['Fall', 'Winter', 'Spring', 'Summer']
function init(page){
  gStylePrefs=  loadFromStorage('userData');
    if(!gStylePrefs) return;
    document.body.style.backgroundColor=gStylePrefs.bColor;
    document.body.style.color=gStylePrefs.fColor;
    if(page==='index'){
      var elH1=document.querySelector('.astrological');
      var idx;
      var date=new Date(gStylePrefs.birthday)
      if(date.getMonth()<3) idx=0
      else if(date.getMonth()<6) idx=1
      else if(date.getMonth()<9) idx=2
      else idx=3;
      elH1.innerText='your birthay season is '+seasons[idx];
    }
    
  }

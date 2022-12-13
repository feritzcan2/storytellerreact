
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { 
      images[item.replace('./', '')] = r(item);
     });
    return images;
  }
  const images = importAll(require.context('../Images', false, /\.(png|jpe?g|svg)$/));
  

  function getDict(images){
    var dict = {}
    {Object.entries(images).map((key, index)=>{
        var text = key[0].trim()
        var splited = text.split("-");
        var char = splited[0].trim();
        if(char.length==1){
            var name = splited[1].trim();
            var splitPage = splited[2].split(".");
            if(!dict[char]){
                dict[char]  = [{active:false,char:char,name:name,page:splitPage[0],link:key[0],src:images[key[0]]}]
            }else{
                dict[char].push( {active:false,char:char,name:name,page:splitPage[0],link:key[0],src:images[key[0]]})

            }
        }
    })}
    return dict;
  }
  var dict = getDict(images);
export default dict  
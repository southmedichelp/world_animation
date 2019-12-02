console.log = function(message) {$('.overlay').prepend(message+"<br>");};
console.error = console.debug = console.info =  console.log

var proton, emitter;
var camera, scene, renderer, dat, clock, spring, controls, gui,scl,genCld;
var group, item, cube, mesh, mesh2, randomBehaviour, gravity, pointLight2 ,pointLight,pointLight3, rectLight;
var s = 0;
var objects = [];
var group = new THREE.Object3D();
var angle = 0, angl = 0;
var radius = 140;
var genObj=[];
var genGr, genSymbl, spot;

var model = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68049/map.js";

$( document ).ready(function() {
    console.log( "jQ ready..." );
    $('body').on("mouseup",function() {
     // alignCloud(objects);
     //genVertices(mesh.geometry.vertices);
    });
  $('.dat').on("mouseup",function() {
     combineCloud(mesh.geometry.vertices,group);
    });
  $('.dat2').on('mouseup',function(){
    spreadCloud(genObj);
  });
});

initAll();

function initAll() {
            initScene();
            loadModel();
            initLights();
            //initHelpers();
            addControls();
            //genCloud();
            //datGui();
            
            animate();
}


function genCloud(){
  
  scl = 1;
  var mat = new THREE.MeshStandardMaterial( { color: 0x000000, wireframe:true} );
  var geometry = new THREE.BoxGeometry(20, 1, this.scl, 1, 1, 1);
  
  for(var i=0 ; i<= 2000; i++){
    var symbol = new THREE.Object3D();
    
    item = new THREE.Mesh (geometry,mat);
    symbol.add(item);
    
    objects.push(symbol);
  }
  spreadCloud(objects);
}
function genBars(){
  var mat = new THREE.MeshStandardMaterial( { color: 0x000000} );
  var geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);
  
  
}
function spreadCloud(arr){
  for (var i = 0, len = arr.length; i < len; i++) {
	        var sym = arr[i];
          //sym.lookAt(scene.position);
          new TWEEN.Tween(sym.position).to({
            x: 200 * Math.random() - 100,
            y: 200 * Math.random() - 100,
            z: 200 * Math.random() - 100
           }, 1000)
            .easing(TWEEN.Easing.Quintic.InOut,).start();
	        //sym.position.set(100 * Math.random() - 50, 100 * Math.random() - 50, 100 * Math.random() - 50);
	        
	        group.add(sym);
	    }
      scene.add(group);
}
function combineCloud(mod,group){
  
  var scale = 100;
  for(var g = 0, len = mod.length; g<len; g++){
    var sym = genObj[g];
    //sym.lookAt(scene.position);
    new TWEEN.Tween(sym.position).to({
            x: mod[g].x/scale,
            y: mod[g].y/scale,
            z: mod[g].z/scale
           }, 1000)
            .easing(TWEEN.Easing.Quintic.InOut,).start();
  }
}
function genVertices(mod){
  console.log(mod.length);
  var mat = new THREE.MeshBasicMaterial({color:0x000000});
  
  var scale = 10;
  for(var g = 0, len = mod.length; g<len; g++){
    var symbl = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry( Math.random(0.2,2), 5, 5);
    spot = new THREE.Mesh (geometry,mat);
    spot.position.set(mod[g].x/scale,mod[g].y/scale,mod[g].z/scale);
    symbl.add(spot);
    
    genObj.push(symbl);
  }
  spreadCloud(genObj);
}
function alignCloud(gr){
  for (var i = 0, len = gr.length; i < len; i++) {
	        var sym = gr[i];
          var curVer = 100 * Math.random() - 50;
          
            new TWEEN.Tween(sym.position).to({
            x: 200 * Math.random() - 50,
            y: 200 * Math.random() - 50,
            z: 200 * Math.random() - 50
           }, 1000)
            .easing(TWEEN.Easing.Quintic.InOut,).start();
    
          new TWEEN.Tween(sym.scale).to({
            x: 1 * Math.random(),
            y: 2* Math.random(),
            z: 1 * Math.random()
           }, 1000)
            .easing(TWEEN.Easing.Quintic.InOut,).start();
    }  
}
// function datGui(){
//   genCld = new genCloud();
//   gui = new dat.GUI();
//   gui.add(genCld, 'scl', 0, 10);
  
// }
function initScene(){
  clock = new THREE.Clock();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100;
  camera.position.y = 20;
  camera.position.x = 100;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 1, 10000);
  
  renderer = new THREE.WebGLRenderer({alpha:true,antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onMouseDown,false); 

}
function onMouseDown() {

}
function addControls() {
    controls = new THREE.TrackballControls( camera,renderer.domElement );
          controls.rotateSpeed = 1.2;
          controls.minDistance = 10;
          controls.maxDistance = 1000;
          controls.noRotate = false;
          controls.addEventListener( 'change', render );
          controls.noZoom = false;
}
function initLights() {
            
            var dlight = new THREE.DirectionalLight( 0xffffff, 1 );
            dlight.position.set( -1, 1, -1); 			//default; light shining from top
            dlight.castShadow = true;            // default false
            scene.add( dlight );
            
            var dlight2 = new THREE.DirectionalLight( 0xffffff, 1 );
            dlight2.position.set( 1, -1, 1 ); 			//default; light shining from top
            dlight2.castShadow = true;            // default false
            scene.add( dlight2 );
            // rectLight = new THREE.RectAreaLight( 0xffffff, 1,  10, 10 );
            // rectLight.intensity = 70.0;
            // rectLight.position.set( 20, 20, 20 );
            // scene.add( rectLight )
             
//             pointLight3 = new THREE.PointLight( 0xffffff, 5, 1000 );
//             pointLight3.position.set( 50, 10, -50 );
//             scene.add( pointLight3 );
  
//             pointLight = new THREE.PointLight( 0x0000ff, 5, 1000 );
//             pointLight.position.set( 20, 20, 20 );
//             scene.add( pointLight );


//             pointLight2 = new THREE.PointLight( 0x00ff00, 2, 1000 );
//             pointLight2.position.set( -20, 10, -20 );
//             scene.add( pointLight2 );
}
function initHelpers(){
            var sphereSize = 1;
  
            var box = new THREE.BoxHelper( cube, 0xffff00 );
            scene.add( box );
  
            var axisHelper = new THREE.AxisHelper( 1000 );
            scene.add( axisHelper );
  
            // var rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
            // scene.add( rectLightHelper );
            
            var pointLightHelper = new THREE.PointLightHelper( pointLight3, sphereSize );
            scene.add( pointLightHelper );

            var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
            scene.add( pointLightHelper );
  

            var pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
            scene.add( pointLightHelper2 );
  
            scene.add(new THREE.GridHelper(100,10));
}
function loadModel() {
            var objectLoader = new THREE.JSONLoader();
            var material1 = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe:true});
            objectLoader.load(model, function(obj) {
                obj.computeFaceNormals();
                mesh = new THREE.Mesh( obj, material1);
                mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.11;
                genVertices(mesh.geometry.vertices);
                scene.add(mesh);
            });
            
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		render();
}

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  s++
  $('.time').text(s);
  TWEEN.update();
  render();
}
function render(){
  renderer.render(scene,camera);
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  angle += 0.001;
  
  // angl += 0.1;
  // for(var g = 0, len = genObj.length; g<len; g++){
  //   var sym = genObj[g];
  //   var rnd = Math.random(0.1,0.1);
  //   sym.scale.x = rnd;
  //   sym.scale.z = rnd;
  //   sym.scale.y = rnd;
  // }
  // mesh.position.x = 1 * Math.cos( angl);
  // mesh.position.z = 1 * Math.sin( angl);
  camera.position.x = radius * Math.cos( angle );  
  camera.position.z = radius * Math.sin( angle );
  
  
  
}
import * as THREE from "three";
window.addEventListener('DOMContentLoaded', init);
let width = window.innerWidth;let height = window.innerHeight;
function init() {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(width, height);
    const scene = new THREE.Scene();
    renderer.setClearColor(0xd6adff, 1);
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0,0,10);

class cube_ins{
    constructor(posi,meshmode,name){
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.meshmode=meshmode;
        switch(this.meshmode){
            case 0:
                this.material = new THREE.MeshNormalMaterial();
                break;
            case 1:
                this.material = new THREE.MeshStandardMaterial({color: 0x7fff7f, roughness:0.5});
                break;
        }
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.cube.position.set(posi[0],posi[1],posi[2]);
        this.cube.name=name;
        scene.add( this.cube );
        this.sta=(Math.random()*0.3+0.1);
        this.tosize=1;
    }
    move(t){
        var range=this.cube.scale.x+(this.tosize-this.cube.scale.x)*0.15;
        this.cube.scale.set(range,range,range);
        this.cube.rotation.x+=(Math.sin(t*this.sta)+0.9)*0.02;
        this.cube.rotation.y+=(Math.sin(t*this.sta)+0.85)*0.02;
        this.cube.rotation.z+=Math.sin(t*this.sta+0.1*Math.PI)*0.02;
        this.tosize=1;
    }
}
let cubes=[];
for (var i=0;i<30;i++){
    cubes.push(new cube_ins([(Math.random()-0.5)*15,(Math.random()-0.5)*9,(Math.random()-0.9)*10],1,i))}

const directionalLight = new THREE.DirectionalLight(0xFFFFFF);// 平行光源
directionalLight.position.set(1, 0.5, 1);
scene.add(directionalLight);

let mouse=new THREE.Vector2(0,0);
let looker=null;
window.addEventListener('mousemove', (event)=>{mouse.x=(event.x/width-0.5)*2;mouse.y=(event.y/height-0.5)*-2;});
window.addEventListener('mousedown', (event)=>{if(looker){scene.remove(looker.object);}});
window.addEventListener('resize',(event) => {
    width = window.innerWidth;height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);renderer.setSize(width, height);camera.aspect = width / height;
    camera.updateProjectionMatrix();
    console.log(width,height);
});
let time=new THREE.Clock();
const raycaster = new THREE.Raycaster();

tick();
function tick() {
    raycaster.setFromCamera(mouse, camera);
    var t=time.getElapsedTime();
    for(var i=0;i<cubes.length;i++){cubes[i].move(t)}
    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length>0){cubes[intersects[0].object.name].tosize=1.5;looker=intersects[0];}
    else{looker=null;}
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}
}
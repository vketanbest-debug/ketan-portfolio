import * as THREE from 'three';
export async function startShape(host){
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(40,1,.1,100);camera.position.z=4.5;
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(220,180);camera.aspect=220/180;camera.updateProjectionMatrix();
 const geometry=new THREE.TorusKnotGeometry(.8,.18,96,12);const material=new THREE.MeshNormalMaterial();const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
 host.replaceChildren(renderer.domElement);renderer.domElement.setAttribute('aria-label','Interactive three-dimensional knot');renderer.domElement.setAttribute('role','img');const render=()=>renderer.render(scene,camera);render();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const move=e=>{if(reduced.matches)return;let r=host.getBoundingClientRect();mesh.rotation.y=(e.clientX-r.left)/r.width*2;mesh.rotation.x=(e.clientY-r.top)/r.height;render();};host.addEventListener('pointermove',move);
 const turn=()=>{mesh.rotation.y+=Math.PI/4;mesh.rotation.x+=.2;render();};window.addEventListener('turn-shape',turn);
 window.addEventListener('pagehide',()=>{host.removeEventListener('pointermove',move);window.removeEventListener('turn-shape',turn);geometry.dispose();material.dispose();renderer.dispose();},{once:true});
}

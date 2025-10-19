import React, {useEffect} from 'react'
import * as THREE from 'three'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from '@gsap/react';
import droneShoot from '../assets/farm360.mp4'
import photo1 from '/img2_.jpg'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'
import photo4 from '../assets/photo4.jpg'
import photo5 from '../assets/photo5.jpg'
import photo6 from '../assets/photo6.jpg'
import photo7 from '../assets/photo7.jpg'

import farm180 from '../assets/farm180.mp4'

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {

  useEffect(() => {
    // Three.js Text Effect Code
    const textContainer = document.querySelector(".text-container");
    let easeFactor = 0.1;
    let scene, camera, renderer, planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let prePosition = { x: 0.5, y: 0.5 };

    const vertexShader = `
      varying vec2 vUv;
      void main () {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = ` 
      varying vec2 vUv;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;

      void main () {
        vec2 gridUV = floor(vUv * vec2(80.0, 80.0)) / vec2(80.0, 80.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);
        vec2 mouseDirection = u_mouse - u_prevMouse;
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.15, 0.0, pixelDistanceToMouse) * 1.0;

        vec2 uvOffset = strength * -mouseDirection * 0.9;
        vec2 uv = vUv - uvOffset;
        vec4 color = texture2D(u_texture, uv);
        gl_FragColor = color;
      }
    `;

    function createTextTexture(text, font, size, color, fontWeight = "100") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const canvasWidth = window.innerWidth * 2;
      const canvasHeight = window.innerHeight * 2;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.fillStyle = color || "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const fontSize = size || Math.floor(canvasWidth * 2);

      ctx.fillStyle = "#ffffff";
      ctx.font = `${fontWeight} ${fontSize}px "${font || "Blanquotey"}"`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const scaleFactor = Math.min(1, (canvasWidth * 1) / textWidth);
      const aspectCorrection = canvasWidth / canvasHeight;

      ctx.setTransform(
        scaleFactor,
        0,
        0,
        scaleFactor / aspectCorrection, 
        canvasWidth / 2, 
        canvasHeight / 2
      );

      ctx.fillText(text, 0, 0);

      return new THREE.CanvasTexture(canvas);
    }

    function initializeScene(texture){
      scene = new THREE.Scene();

      const aspectRatio = window.innerWidth / window.innerHeight;
      camera = new THREE.OrthographicCamera(
        -1,
        1,
        1 / aspectRatio,
        -1 / aspectRatio,
        0.1,
        1000
      )

      camera.position.z = 1;

      let shaderUniforms = {
        u_mouse: { type: "v2", value: new THREE.Vector2() }, 
        u_prevMouse: { type: "v2", value: new THREE.Vector2() },
        u_texture: { type: "t", value: texture },
      };

      planeMesh = new THREE.Mesh (
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms, 
          vertexShader, 
          fragmentShader,
        })
      );

      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(0xffffff, 1);
      renderer.setSize(window.innerWidth, window.innerHeight); 
      renderer.setPixelRatio(window.devicePixelRatio);

      textContainer.appendChild(renderer.domElement);
    }

    function reloadTexture () {
      const newTexture = createTextTexture("PARADISE", null, 500, "#000000", "400");
      planeMesh.material.uniforms.u_texture.value = newTexture;
    }

    initializeScene(createTextTexture("PARADISE", null, 500, "#000000", "400"));

    function animateScene(){
      requestAnimationFrame(animateScene);

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor; 
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;
      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );
      
      planeMesh.material.uniforms.u_prevMouse.value.set(
        prePosition.x,
        1.0 - prePosition.y
      );

      renderer.render(scene, camera);
    }

    animateScene();

    function handleMouseMove(event) {
      easeFactor = 0.09;
      let rect = textContainer.getBoundingClientRect();
      prePosition = { ...targetMousePosition };

      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;
    }

    function handleMouseEnter(event){
      easeFactor = 0.1;
      let rect = textContainer.getBoundingClientRect();

      mousePosition.x = targetMousePosition.x =
        (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y =
        (event.clientY - rect.top) / rect.height;
    }

    function handleMouseLeave(){
      easeFactor = 0.09;
      targetMousePosition = { ...prePosition };
    }

    textContainer.addEventListener("mousemove", handleMouseMove); 
    textContainer.addEventListener("mouseenter", handleMouseEnter);
    textContainer.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize(){
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -1;
      camera.right = 1;
      camera.top = 1 / aspectRatio;
      camera.bottom = -1 / aspectRatio;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      reloadTexture();
    }

  }, []);


  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.others2', 
        start: 'top 20%',   
        end: 'top -30%',   
        scrub: 2
      }
    });

    
    gsap.from(".video-container", {
      scale: 0.4,
      duration: 3,
      borderRadius: '50px',
      ease: 'power1',
      scrollTrigger: {
        trigger: '.video-container',
        scroller: 'body',
        scrub: 2,
        start: 'top 100%',
        end: 'top 30%',
      }
    });

    gsap.from(".image-container", {
      width: '0px',
      duration: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: '.others',
        scroller: 'body',
        start: 'top 40%',
        end: 'top 15%'
      },
      stagger: 0.5
    });

    tl.from("#p5", {
      y: 300,
      opacity: 0,
      duration: 1

    });

    tl.from("#p6", {
      y: 300,
      opacity: 0,
      duration: 1
    });

    tl.from("#p7", {
      y: 300,
      opacity: 0,
      duration: 1
    });

    gsap.from(".video-container2", {
      scale: 0,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.video-container2',
        scroller: 'body',
        start: 'top 70%'
      }
    });
    

  });

  return (
    <>
      <div className='navigation'>
        <a href='/' className='nav-links'>HOME</a>
        <a href='/gallery' className='nav-links'>OUR&nbsp;GALLERY</a>
        <a href='/stay' className='nav-links'>STAY&nbsp;WITH&nbsp;US</a>
        <a href='/reservation' className='nav-links'>RESERVATION</a>
      </div>

      <div className='text-container'>
        <div className='sub-text'>Journey Into</div>
      </div>

      <div className='video-container'>
        <video width="100%" height="100%" autoPlay loop muted>
          <source src={droneShoot} type="video/mp4" />
        </video>
      </div>

      <div className="others">
        <div className="image-container" id="p1">
          <img src={photo1} className="photo" />
        </div>

        <div className="image-container" id="p2">
          <img src={photo2} className="photo" />
        </div>

        <div className='text1'>
          Nestled between majestic mountains...<br />
          Surrounded by lush greenery and the soothing hum of nature...<br />
          <span>An idyllic escape where peace and beauty converge, inviting you to immerse yourself in the harmony of nature. <br />Let every breath of fresh air and the gentle whispers of the landscape soothe your soul.</span>
        </div>

        <div className="other-image-container" id="p3">
          <img src={photo3} className="other-photo" />
        </div>

        <div className="other-image-container" id="p4">
          <img src={photo4} className="other-photo" />
        </div>

      </div>

      <div className="others2">
        <div className='text2'>
          <span>
            Discover a sanctuary where nature's beauty embraces you at every turn. Here, the dawn brings an ethereal glow, and the gentle breeze calms the senses. <br />This serene hideaway offers stunning vistas alongside unmatched hospitality, creating an unforgettable escape from the everyday.<br />
          </span>
          <br />A tranquil retreat where every sunrise is magical...<br />
          And the cool mountain breeze carries serenity to your soul...<br />
        </div>

        <div className="image-container2" id="p5">
          <img src={photo5} className="photo2" />
        </div>
        <div className="image-container2" id="p6">
          <img src={photo6} className="photo2" />
        </div>
        <div className="image-container2" id="p7">
          <img src={photo7} className="photo2" />
        </div>

        <div className='video-container2'>
          <video width="100%" height="100%" autoPlay loop muted>
            <source src={farm180} type="video/mp4" />
          </video>
        </div>

        <div className='text3'>
          Welcome to a hidden gem...<br />
          Where breathtaking views meet unparalleled comfort.
        </div>


      </div>
    </>
  );
}

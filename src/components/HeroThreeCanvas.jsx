import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeCanvas({ scrollProgressRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 560;
    const height = container.clientHeight || 620;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Main 3D Bust Group
    const bustGroup = new THREE.Group();
    scene.add(bustGroup);

    // Materials - Sleek dark obsidian silhouette shader style
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.35,
      metalness: 0.18,
      flatShading: false,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.75,
      metalness: 0.05,
    });

    const suitMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0b0e,
      roughness: 0.85,
      metalness: 0.1,
    });

    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.3,
      metalness: 0.05,
    });

    const glassesFrameMat = new THREE.MeshStandardMaterial({
      color: 0x050507,
      roughness: 0.15,
      metalness: 0.9,
    });

    const glassesLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a101a,
      roughness: 0.05,
      metalness: 0.2,
      transmission: 0.45,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.88,
    });

    // 1. Head Cranium & Jaw Structure
    const headGeom = new THREE.SphereGeometry(0.86, 48, 48);
    headGeom.scale(0.88, 1.14, 1.02);
    const headMesh = new THREE.Mesh(headGeom, skinMaterial);
    headMesh.position.set(0, 0.24, 0);
    bustGroup.add(headMesh);

    // Jaw & Chin
    const chinGeom = new THREE.ConeGeometry(0.66, 0.88, 32);
    chinGeom.rotateX(Math.PI);
    chinGeom.scale(0.82, 1.0, 0.88);
    const chinMesh = new THREE.Mesh(chinGeom, skinMaterial);
    chinMesh.position.set(0, -0.22, 0.24);
    bustGroup.add(chinMesh);

    // Nose
    const noseGeom = new THREE.CylinderGeometry(0.04, 0.13, 0.44, 16);
    noseGeom.rotateX(0.26);
    const noseMesh = new THREE.Mesh(noseGeom, skinMaterial);
    noseMesh.position.set(0, 0.16, 0.88);
    bustGroup.add(noseMesh);

    // Cheekbones
    const cheekGeom = new THREE.SphereGeometry(0.34, 24, 24);
    cheekGeom.scale(0.55, 0.78, 1.05);
    const leftCheek = new THREE.Mesh(cheekGeom, skinMaterial);
    leftCheek.position.set(-0.44, 0.08, 0.44);
    const rightCheek = leftCheek.clone();
    rightCheek.position.set(0.44, 0.08, 0.44);
    bustGroup.add(leftCheek);
    bustGroup.add(rightCheek);

    // 2. Hair Structure with Distinct Topknot / Hair Bun at Back
    const hairGroup = new THREE.Group();

    // Cranium hair cap
    const capGeom = new THREE.SphereGeometry(0.9, 32, 32);
    capGeom.scale(0.92, 1.16, 1.06);
    const hairCap = new THREE.Mesh(capGeom, hairMaterial);
    hairCap.position.set(0, 0.28, -0.04);
    hairGroup.add(hairCap);

    // Hair Bun at the back/top (matching the iconic silhouette!)
    const bunGeom = new THREE.SphereGeometry(0.36, 32, 32);
    bunGeom.scale(1.0, 1.1, 0.85);
    const hairBun = new THREE.Mesh(bunGeom, hairMaterial);
    hairBun.position.set(0, 0.32, -0.92);
    hairGroup.add(hairBun);

    // Hair Bun Base ring
    const bunTorusGeom = new THREE.TorusGeometry(0.24, 0.08, 16, 32);
    const bunTorus = new THREE.Mesh(bunTorusGeom, hairMaterial);
    bunTorus.position.set(0, 0.32, -0.82);
    hairGroup.add(bunTorus);

    // Subtle volumetric hair strand clusters
    const tuftGeom = new THREE.DodecahedronGeometry(0.2, 1);
    for (let i = 0; i < 28; i++) {
      const tuft = new THREE.Mesh(tuftGeom, hairMaterial);
      const angle = (i / 28) * Math.PI * 2;
      tuft.position.set(
        Math.cos(angle) * 0.82,
        0.8 + Math.sin(angle * 2) * 0.15,
        Math.sin(angle) * 0.65 - 0.25
      );
      tuft.scale.set(0.8, 0.6, 0.8);
      hairGroup.add(tuft);
    }
    bustGroup.add(hairGroup);

    // 3. High-Fashion Glasses (matching Vikash's glasses!)
    const glassesGroup = new THREE.Group();

    // Left Lens
    const lensGeom = new THREE.BoxGeometry(0.36, 0.28, 0.04);
    const leftLens = new THREE.Mesh(lensGeom, glassesLensMat);
    leftLens.position.set(-0.28, 0.26, 0.84);

    // Right Lens
    const rightLens = new THREE.Mesh(lensGeom, glassesLensMat);
    rightLens.position.set(0.28, 0.26, 0.84);

    // Left Frame Rim
    const rimGeom = new THREE.TorusGeometry(0.18, 0.024, 16, 32);
    const leftRim = new THREE.Mesh(rimGeom, glassesFrameMat);
    leftRim.position.set(-0.28, 0.26, 0.84);
    leftRim.scale.set(1.12, 0.88, 1);

    // Right Frame Rim
    const rightRim = new THREE.Mesh(rimGeom, glassesFrameMat);
    rightRim.position.set(0.28, 0.26, 0.84);
    rightRim.scale.set(1.12, 0.88, 1);

    // Center Bridge
    const bridgeGeom = new THREE.BoxGeometry(0.18, 0.035, 0.03);
    const bridge = new THREE.Mesh(bridgeGeom, glassesFrameMat);
    bridge.position.set(0, 0.28, 0.86);

    // Temples / Arms going back to ears
    const templeGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.95, 8);
    templeGeom.rotateX(Math.PI / 2);
    const leftTemple = new THREE.Mesh(templeGeom, glassesFrameMat);
    leftTemple.position.set(-0.46, 0.26, 0.4);
    leftTemple.rotation.set(0, -0.14, 0);

    const rightTemple = new THREE.Mesh(templeGeom, glassesFrameMat);
    rightTemple.position.set(0.46, 0.26, 0.4);
    rightTemple.rotation.set(0, 0.14, 0);

    glassesGroup.add(leftLens);
    glassesGroup.add(rightLens);
    glassesGroup.add(leftRim);
    glassesGroup.add(rightRim);
    glassesGroup.add(bridge);
    glassesGroup.add(leftTemple);
    glassesGroup.add(rightTemple);

    bustGroup.add(glassesGroup);

    // 4. Neck, White Shirt Collar & Dark Suit Jacket
    // Neck
    const neckGeom = new THREE.CylinderGeometry(0.4, 0.48, 0.9, 32);
    const neckMesh = new THREE.Mesh(neckGeom, skinMaterial);
    neckMesh.position.set(0, -0.68, -0.05);
    bustGroup.add(neckMesh);

    // White Shirt V-Neck
    const shirtGeom = new THREE.ConeGeometry(0.38, 0.7, 4);
    shirtGeom.rotateY(Math.PI / 4);
    const shirtMesh = new THREE.Mesh(shirtGeom, shirtMaterial);
    shirtMesh.position.set(0, -1.05, 0.32);
    shirtMesh.scale.set(0.7, 1.2, 0.5);
    bustGroup.add(shirtMesh);

    // Suit Jacket / Shoulders
    const shoulderGeom = new THREE.CylinderGeometry(0.75, 1.9, 1.25, 48, 1, false, 0, Math.PI);
    shoulderGeom.rotateY(-Math.PI / 2);
    shoulderGeom.scale(1.75, 0.92, 0.9);
    const shoulderMesh = new THREE.Mesh(shoulderGeom, suitMaterial);
    shoulderMesh.position.set(0, -1.48, -0.05);
    bustGroup.add(shoulderMesh);

    // 5. Lighting Setup - High-Contrast Editorial Studio Lighting
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Rim light 1 (Traces the side silhouette edges in profile)
    const rimLightLeft = new THREE.DirectionalLight(0xffffff, 3.8);
    rimLightLeft.position.set(-4.5, 2.5, -2.5);
    scene.add(rimLightLeft);

    // Rim light 2 (Back-right rim)
    const rimLightRight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLightRight.position.set(4.5, 3.0, -1.5);
    scene.add(rimLightRight);

    // Key Light (Reveals face details and glasses reflections as it turns front)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(2, 3, 4.5);
    scene.add(keyLight);

    // Subtle front-bottom bounce
    const bounceLight = new THREE.DirectionalLight(0xddeeff, 0.8);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // Initial position: Silhouette side profile looking up/side (like hero_silhouette.png)
    bustGroup.rotation.y = -1.35;
    bustGroup.rotation.x = -0.26;
    bustGroup.position.set(0.12, -0.15, 0);

    // Mouse Tracking offsets
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop frame-locked to ScrollTrigger progress
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Get scroll progress (0 to 1) from the pinned ScrollTrigger in Hero.jsx
      const progress = scrollProgressRef?.current ?? 0;

      // 3D Rotation Interpolation:
      // Start (progress = 0): side profile looking up/side (rotation.y = -1.35, rotation.x = -0.26)
      // End (progress = 1): 100% front facing (rotation.y = 0.0, rotation.x = 0.0)
      // The rotation completes by progress = 0.85, then holds steady facing forward!
      const rotProgress = Math.min(progress / 0.85, 1.0);

      const targetRotY = THREE.MathUtils.lerp(-1.35, 0.0, rotProgress);
      const targetRotX = THREE.MathUtils.lerp(-0.26, 0.0, rotProgress);
      const targetPosX = THREE.MathUtils.lerp(0.12, 0.0, rotProgress);

      // Mouse Parallax (only subtle, natural head tracking)
      const mouseInfluence = THREE.MathUtils.lerp(0.15, 0.35, rotProgress);
      const targetMouseY = targetRotY + mouseX * mouseInfluence;
      const targetMouseX = targetRotX + mouseY * (mouseInfluence * 0.7);

      // Idle breathing float
      const idleFloat = Math.sin(time * 1.8) * 0.015;

      // Smooth damping (lerp)
      bustGroup.rotation.y += (targetMouseY - bustGroup.rotation.y) * 0.12;
      bustGroup.rotation.x += (targetMouseX - bustGroup.rotation.x) * 0.12;
      bustGroup.position.x += (targetPosX + mouseX * 0.1 - bustGroup.position.x) * 0.12;
      bustGroup.position.y += (-0.15 + idleFloat - mouseY * 0.08 - bustGroup.position.y) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgressRef]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative z-10 pointer-events-none flex items-center justify-center"
      style={{
        filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.28))',
      }}
    />
  );
}

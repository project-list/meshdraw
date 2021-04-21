var CToolManager = function () {

    document.addEventListener('keydown', CToolManager.OnKeyPress);
    document.addEventListener('keyup', CToolManager.OnKeyUp);
	
	CContext.glViewContainer.addEventListener('mousedown', CToolManager.OnMouseDown);
    CContext.glViewContainer.addEventListener('mouseup', CToolManager.OnMouseUp);
    CContext.glViewContainer.addEventListener('mousemove', CToolManager.OnMouseMove);
    CContext.glViewContainer.addEventListener('dblclick', CToolManager.OnMouseDoubleClick);
	CToolManager.lineMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff
	});
	
    CManipulationTool.InitTool();
    CLandmarkTool.InitTool();
}

CToolManager.currentActiontype = 'ManipulateCamera';
CToolManager.OnKeyPress = function (e) {
    var keyCode = e.keyCode;
    //if (keyCode == 17) {//ctrl
    //    CToolManager.currentActiontype = 'ManipulateCamera';
    //}
    //else 
    if (keyCode == 18) {//alt
        CToolManager.currentActiontype = 'ManipulateMesh';
    }
    else if (keyCode == 66) {//reset camera key_b
        CContext.viewer.ResetCamera();
    }
    // else if (keyCode == 68) {//key_d draw
        // if (CToolManager.currentActiontype == 'VolumeDraw') {
            // CToolManager.currentActiontype = 'ManipulateCamera'
        // }
        // else
        // CToolManager.currentActiontype = 'VolumeDraw';
    // }
    else if (keyCode == 80) {//key_p picklandmark
        if (CToolManager.currentActiontype == 'LandmarkPicking') {
            CToolManager.currentActiontype = 'ManipulateCamera'
        }
        else
            CToolManager.currentActiontype = 'LandmarkPicking';
    }
    else if (keyCode == 82) {//key_r toggle render style
        CContext.scene.ToggleRenderVolumeDataStyle();
    }
    else if (keyCode == 84) {//key_t toggle camera
        CContext.viewer.ToggleCamera();
    }
    else if (keyCode == 76) {//L
        var fname = 'resources/LowerJaw.stl';
        var loader = new THREE.STLLoader();
        loader.load(fname, function (geometry) {

            var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xaaaaaa, shininess: 0, wireframe: false, shading: THREE.FlatShading, side: THREE.DoubleSide });
           
            var mesh = new THREE.Mesh(geometry, material);
            mesh.geometry.normalsNeedUpdate = true;
            //mesh.position.set(0, -0.25, 0.6);
            mesh.rotation.set(0, -Math.PI, 0);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
			mesh.name="main_model";
            CContext.scene.AddMeshObject(mesh);

        });
    }
	else if (keyCode == 68) {//D
		if (CToolManager.currentActiontype == 'DrawSketch') {
            CToolManager.currentActiontype = 'ManipulateCamera'
        }
        else
            CToolManager.currentActiontype = 'DrawSketch';
	}
	
}
CToolManager.OnKeyUp = function (e) {
    var keyCode = e.keyCode;
    //if (keyCode == 17) {//ctrl
    //    CToolManager.currentActiontype = 'ManipulateCamera';
    //}
    //else 
    if (keyCode == 18) {//alt
        CToolManager.currentActiontype = 'ManipulateCamera';
    }
}


// CToolManager.OnMouseDown = function (e) {
    // if (CToolManager.currentActiontype == 'CrownSeg') {
        // var mousepos = new THREE.Vector2(e.clientX, e.clientY);
       
       
        // if (e.button == 0) {//left button{
            // CToolManager.isLButtonDown = true;
            // var glpos = CToolManager.Mouse2GlPos(mousepos);
            // if (CToolManager.line != undefined)
            // {
                // CContext.scene.RemoveAuxObject(CToolManager.line);
            // }
            // CToolManager.lineGeo = new THREE.Geometry();
            // CToolManager.lineMousePos= new Array();
            // CToolManager.line = new THREE.Line(CToolManager.lineGeo.clone(), CToolManager.lineMaterial);

        // }
   
    // }
// }
// CToolManager.Mouse2GlProjPos = function (mousePos) {
    // var glprojpos = new THREE.Vector2();
    // glprojpos.x = ((mousePos.x - CContext.glViewContainer.offsetLeft) / CContext.glViewContainer.offsetWidth) * 2 - 1;
    // glprojpos.y = -((mousePos.y - CContext.glViewContainer.offsetTop) / CContext.glViewContainer.offsetHeight) * 2 + 1;
    // return glprojpos;
// }
// CToolManager.Mouse2GlPos = function (mousePos) {
    // var glprojpos = new THREE.Vector3();
    // glprojpos.x = ((mousePos.x - CContext.glViewContainer.offsetLeft) / CContext.glViewContainer.offsetWidth) * 2 - 1;
    // glprojpos.y = -((mousePos.y - CContext.glViewContainer.offsetTop) / CContext.glViewContainer.offsetHeight) * 2 + 1;
    // glprojpos.z = -0.9;
    // var glpos = new THREE.Vector3(glprojpos.x, glprojpos.y, glprojpos.z).unproject(CContext.viewer.camera);

    // return glpos;
// }
// CToolManager.OnMouseMove = function (e) {
    // if (CToolManager.currentActiontype == 'CrownSeg') {
        // var mousepos = new THREE.Vector2(e.clientX, e.clientY);
        // if (CToolManager.isLButtonDown && CToolManager.line != undefined) {
            // var glpos = CToolManager.Mouse2GlPos(mousepos);
 
            // CToolManager.lineGeo.vertices.push(glpos);
            // CToolManager.lineMousePos.push(mousepos);
            // if (CToolManager.lineGeo.vertices.length >= 2) {
                // CContext.scene.RemoveAuxObject(CToolManager.line);
                // CToolManager.line = new THREE.Line(CToolManager.lineGeo.clone(), CToolManager.lineMaterial);
                // CContext.scene.AddAuxObject(CToolManager.line);
            // }
        // }
    // }
// }
// CToolManager.OnMouseUp = function (e) {
    // if (CToolManager.currentActiontype == 'CrownSeg') {
        // if (e.button == 0) {//left button{
            // CToolManager.isLButtonDown = false;
        // }
      
    // }
// }
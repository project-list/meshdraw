CLandmarkTool= function () {
    CContext.glViewContainer.addEventListener('mousedown', CLandmarkTool.OnMouseDown);
    CContext.glViewContainer.addEventListener('mouseup', CLandmarkTool.OnMouseUp);
    CContext.glViewContainer.addEventListener('mousemove', CLandmarkTool.OnMouseMove);
}
CLandmarkTool.isLButtonDown = false;
CLandmarkTool.isRButtonDown = false;
CLandmarkTool.lineMaterial = new THREE.LineBasicMaterial({ color: 00000000, linewidth: 100.0} );
CLandmarkTool.InitTool = function () {
    CLandmarkTool();
  
CLandmarkTool.count=1;
}


CLandmarkTool.PickLandmark = function (mousepos) {

    if (CLandmarkTool.isLButtonDown) {
        var glMousePos = CManipulationTool.Mouse2GlProjPos(mousepos);
        var meshArray = CContext.scene.GetMeshArray();
        var intersects = CContext.scene.PickMeshs(glMousePos, CContext.viewer.camera);
        var minDis = Number.MAX_VALUE;
        var mi = -1;
        for (var i = 0; i < intersects.length; i++) {
            if (minDis > intersects[i].distance) {
                minDis = intersects[i].distance;
                mi = i;
            }
        }

        if (mi == -1)
            CContext.selectedMesh = null;
        else {
            // CContext.selectedMesh = intersects[mi].object;
            // CContext.selectedMesh.material.color.set(0xdddd00);
            var geometry = new THREE.SphereGeometry(0.01, 20, 20, 0, Math.PI * 2, 0, Math.PI * 2);
            var material = new THREE.MeshPhongMaterial({ color: 0x0000ff, specular: 0xaaaaaa, shininess: 0, wireframe: false, shading: THREE.SmoothShading, side: THREE.DoubleSide });
            var sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(intersects[mi].point.x, intersects[mi].point.y, intersects[mi].point.z);
            sphere.updateMatrix();
            sphere.type = 'surfacelandmark';
			sphere.name = CLandmarkTool.count.toString();
            CContext.scene.AddMeshObject(sphere);
			setTimeout(input,300); 

        }
    }
    else if (CLandmarkTool.isRButtonDown) {
		var glMousePos = CManipulationTool.Mouse2GlProjPos(mousepos);
        var intersects = CContext.scene.PickMeshs(glMousePos, CContext.viewer.camera);
        var minDis = Number.MAX_VALUE;
        var mi = -1;
        for (var i = 0; i < intersects.length; i++) {
            if (minDis > intersects[i].distance) {
                minDis = intersects[i].distance;
                mi = i;
            }
        }

        if (mi == -1)
            CContext.selectedMesh = null;
        else {
            CContext.selectedMesh = intersects[mi].object;
			
			if(CContext.selectedMesh.name=="main_model")
				return;
			
            CContext.selectedMesh.material.color.set(0xdddd00);
			name = CContext.selectedMesh.name;
			
			document.getElementById(name).style.background = "#FF6666";
			for(var i=1; i<CLandmarkTool.count; i++)
			{
			obj_reset = i.toString();
			if(obj_reset!=name)
				{
					document.getElementById(obj_reset).style.background = "#f0f8ff";
					reset_object = CContext.scene.meshScene.getObjectByName(obj_reset);
					reset_object.material.color.set(0x0000ff);
				}
			}
    }
	}

}

CLandmarkTool.Mouse2GlProjPos = function (mousePos) {
    var glprojpos = new THREE.Vector2();
    glprojpos.x = ((mousePos.x - CContext.glViewContainer.offsetLeft) / CContext.glViewContainer.offsetWidth) * 2 - 1;
    glprojpos.y = -((mousePos.y - CContext.glViewContainer.offsetTop) / CContext.glViewContainer.offsetHeight) * 2 + 1;
    return glprojpos;
}
CLandmarkTool.Mouse2GlPos = function (mousePos) {
    var glprojpos = new THREE.Vector3();
    glprojpos.x = ((mousePos.x - CContext.glViewContainer.offsetLeft) / CContext.glViewContainer.offsetWidth) * 2 - 1;
    glprojpos.y = -((mousePos.y - CContext.glViewContainer.offsetTop) / CContext.glViewContainer.offsetHeight) * 2 + 1;
    glprojpos.z = -0.9;
    var glpos = new THREE.Vector3(glprojpos.x, glprojpos.y, glprojpos.z).unproject(CContext.viewer.camera);

    return glpos;
}

function makeLine(geo, name) {
        var g = new MeshLine();
        g.setGeometry(geo);
    
        var material = new MeshLineMaterial( {
            useMap: false,
            color: new THREE.Color( 0x0000ff ),
            opacity: 1,
            resolution: new THREE.Vector2( window.innerWidth, window.innerHeight ),
            sizeAttenuation: !false,
            lineWidth: 0.01
        });
        mesh = new THREE.Mesh( g.geometry, material );
		mesh.name = name;
		//mesh.raycast = MeshLineRaycast;
        CContext.scene.AddAuxObject( mesh );
}

CLandmarkTool.OnMouseDown = function (e) {
    if (CToolManager.currentActiontype == 'LandmarkPicking') {
        var mousepos = new THREE.Vector2(e.clientX, e.clientY);
        var glpos = CManipulationTool.Mouse2GlProjPos(mousepos);
        if (event.button == 0) {//left button{
            CLandmarkTool.isLButtonDown = true;
            CLandmarkTool.PickLandmark(mousepos);

        }
        else if (event.button == 2) {//right button{
            CLandmarkTool.isRButtonDown = true;
            CLandmarkTool.PickLandmark(mousepos);

        }
    }
	else if (CToolManager.currentActiontype == 'DrawSketch')
	{
		var mousepos = new THREE.Vector2(e.clientX, e.clientY);

        if (e.button == 0) {//left button{
            CLandmarkTool.isLButtonDown = true;
            CLandmarkTool.lineGeo = new THREE.Geometry();
            CLandmarkTool.lineMousePos= new Array();
            CLandmarkTool.line = new THREE.Line(CLandmarkTool.lineGeo.clone(), CLandmarkTool.lineMaterial);
			
			CLandmarkTool.lineGeo2d = new THREE.Geometry();
			CLandmarkTool.line2d = new THREE.Line(CLandmarkTool.lineGeo2d.clone(), CLandmarkTool.lineMaterial);

			}
			
		if (e.button == 2) {//left button{
            CLandmarkTool.isRButtonDown = true;
			}
	}
	
	
}


CLandmarkTool.OnMouseMove = function (e) {
    if (CToolManager.currentActiontype == 'LandmarkPicking') {
        var mousepos = new THREE.Vector2(e.clientX, e.clientY);
        if (CLandmarkTool.isLButtonDown) {
           
        }
    }
	else if (CToolManager.currentActiontype == 'DrawSketch') {
		
	    var mousepos = new THREE.Vector2(e.clientX, e.clientY);
		var glpos2d = CLandmarkTool.Mouse2GlPos(mousepos);

		if (CLandmarkTool.isLButtonDown) {
			{
				CLandmarkTool.lineMousePos.push(mousepos);
				CLandmarkTool.lineGeo2d.vertices.push(glpos2d);
				
				if (CLandmarkTool.lineGeo2d.vertices.length >= 2) 
				{
				CLandmarkTool.line2d = new THREE.Line(CLandmarkTool.lineGeo2d.clone(), CLandmarkTool.lineMaterial);
                //CContext.scene.AddAuxObject(CLandmarkTool.line2d);
				}
			}
		}
        
		}
	
}


function input(){
		var comment=prompt("Please input your comments:");
		var id=(CLandmarkTool.count++).toString();
		document.getElementById("right").innerHTML+= "<div id =\"" + id +  "\" style = \"font-size: 35px; width:95%; margin: auto; background: #f0f8ff; border-radius:15px \" > comments " 
		+ id + ":<br>" + comment + "</div><br>";
} 

CLandmarkTool.OnMouseUp = function (e) {
    if (CToolManager.currentActiontype == 'LandmarkPicking') {
        if (event.button == 0) {//left button{
            CLandmarkTool.isLButtonDown = false;
        }
        else if (event.button ==2) {//right button{
            CLandmarkTool.isRButtonDown = false;
        }
    }
	
	if (CToolManager.currentActiontype == 'DrawSketch') 
	{	
        if (event.button == 0) {//left button{
            CLandmarkTool.isLButtonDown = false;
        }
        else if (event.button ==2) {//right button{
            CLandmarkTool.isRButtonDown = false;
        }
		
		for (var k=0; k<CLandmarkTool.lineMousePos.length; k++)
		{	
			var mousepos = CLandmarkTool.lineMousePos[k];
			var glMousePos = CManipulationTool.Mouse2GlProjPos(mousepos);
			var intersects = CContext.scene.PickMeshs(glMousePos, CContext.viewer.camera);
			var minDis = Number.MAX_VALUE;
			var mi = -1;
			for (var i = 0; i < intersects.length; i+=10) {
				if (minDis > intersects[i].distance) {
					minDis = intersects[i].distance;
					mi = i;
				}
			}
			if (mi == -1)
				CContext.selectedMesh = null;
			else {
				CLandmarkTool.lineGeo.vertices.push(new THREE.Vector3(intersects[mi].point.x, intersects[mi].point.y, intersects[mi].point.z));
			}
			
		}
		if (CLandmarkTool.lineGeo.vertices.length >= 2) {

			CLandmarkTool.line = new THREE.Line(CLandmarkTool.lineGeo.clone(), CLandmarkTool.lineMaterial);
			makeLine(CLandmarkTool.lineGeo.clone(), CLandmarkTool.count.toString());
			// CContext.scene.AddAuxObject(CLandmarkTool.line);
		}
		if (CLandmarkTool.lineGeo.vertices.length >= 2)
		setTimeout(input, CLandmarkTool.count.toString()); 
	}
}
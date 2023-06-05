function RGBAToHSLA(rgba) {
	  console.log(rgba)
		let sep = rgba.indexOf(",") > -1 ? "," : " ";
		rgba = rgba.split("(")[1].split(")")[0].split(sep);
    console.log(rgba)
		// strip the slash if using space-separated syntax
		if (rgba.indexOf("/") > -1)
			rgba.splice(3,1);

		for (let R in rgba) {
			let r = rgba[R];
			if (r.indexOf("%") > -1) {
				let p = r.substr(0,r.length - 1) / 100;

				if (R < 3) {
					rgba[R] = Math.round(p * 255);
				}
			}
		}

		// make r, g, and b fractions of 1
		let r = rgba[0] / 255,
			g = rgba[1] / 255,
			b = rgba[2] / 255,
			a = rgba[3],

		// find greatest and smallest channel values
			cmin = Math.min(r,g,b),
			cmax = Math.max(r,g,b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		// calculate hue
		// no difference
		if (delta == 0)
			h = 0;
		// red is max
		else if (cmax == r)
			h = ((g - b) / delta) % 6;
		// green is max
		else if (cmax == g)
			h = (b - r) / delta + 2;
		// blue is max
		else
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// make negative hues positive behind 360°
		if (h < 0)
			h += 360;

		// calculate lightness
		l = (cmax + cmin) / 2;

		// calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

    if (a == undefined)
      a = 0;
		return [h,s,l,a];
}

function tint(sat,hue) {
   var elements = document.getElementsByTagName('*');
   for (var i=0;i<elements.length;i++) {
	  var color = window.getComputedStyle(elements[i]).color;
		console.log(window.getComputedStyle(elements[i]))
      var hsl= RGBAToHSLA(color);
      console.log(hsl);
      if (hsl.saturation == 0) {
         var set = hsla(hue,sat,hsl.lightness,color.alpha);
         elements[i].style.color=set;
      }
	  var backgroundColor = window.getComputedStyle(elements[i]).backgroundColor;
      console.log(backgroundColor);
      if (backgroundColor.indexOf('rgba')<0) {
        var hsl= RGBAToHSLA(color);
        if (hsl.saturation == 0) {
           var set = hsla(hue,sat,hsl.lightness,color.alpha);
    	     elements[i].style.backgroundColor=to;
    	  }
  	  }

   }
}

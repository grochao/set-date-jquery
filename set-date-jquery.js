/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* @Autor: 		Guillermo Rocha Ortiz
* @Email: 		g.rocha.o@outlook.com
* @Fecha: 		17 - Agosto - 2014
* @Version: 	1.0
* @Licencia: 	Open Sources - freeware
*
* @Descripcion:
*  este plugin de para jquery controla elementos de fechas mas amigables
*  que las proporcionadas por la clase DATE de javascript. 
*
*  Configuraciones
*
*	 num_dia:  permite configurar el dia que deseamos que aparesca seleccionado por defecto
*	 num_mes:  permite configurar el mes que deseamos que aparesca seleccionado por defecto
*  	 num_anio:  permite configurar el anio que deseamos que aparesca seleccionado por defecto
* 	 ***NOTA: si no se configuran estas fechas por defecto se cargara la fecha del sistema actual
*
*	 dias_festivos : cadena de texto donde escribomos los dias feriados en formato pares de dos digitos 
*					ejemplo,
*	                     para el 23 de agosto 
*	                escribir "02/08"  -> donde el 02 es el dia y el 08es el numero correspondiente al mes
*	                ejemplo
*	                	 para ingrasar mas de un dia escribomos los dias feriados en formato pares de dos digitos separado por coma
*	                escribir "02/08,14/09,15/08,25/12" para los dias 2 de agosto, 14 de septiembre, 15 de septiembre, 25 de diciembre respectivamente
*	 
*	 adelantar_dia : permite selecconar por defecto dias posteriores o anterioes a la fecha actual
*	
*	 bloquear_Domingo: 
*	 bloquear_Sabado: 
*	 bloquear_feriados:  estas tres variables permiten activar o desactivar la seleccion de dias feriados, sabados o domingos
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
jQuery.fn.extend({
	carga_combos:function(options){
		var contenedor_combo = jQuery(this);
		contenedor_combo.children("#dia").html("");
		contenedor_combo.children("#mes").html("");
		contenedor_combo.children("#anio").html("");
		var html_tmp="";
		/*carga los dias*/
		for(i=1; i<=31;i++)
		{
			html_tmp+='<option value="'+((i<10)?"0"+i:i)+'"  >'+((i<10)?"0"+i:i)+'</option>';
		}
		contenedor_combo.children("#dia").html(html_tmp);
		
		html_tmp="";
		for(i=1; i<=12;i++)
		{
			html_tmp+='<option value="'+((i<10)?"0"+i:i)+'"  >'+((i<10)?"0"+i:i)+'</option>';
		}
		contenedor_combo.children("#mes").html(html_tmp);

		html_tmp="";
		var fechaHOY = new Date();
		html_tmp+='<option value="'+(fechaHOY.getFullYear())+'"  >'+(fechaHOY.getFullYear())+'</option>';
		html_tmp+='<option value="'+(fechaHOY.getFullYear()+1)+'"  >'+(fechaHOY.getFullYear()+1)+'</option>';

		contenedor_combo.children("#anio").html(html_tmp );

	},
	SetFecha:function(options){
		var un_dia=1000*60*60*24;
		var comboDia = jQuery(this).children("#dia");
		var comboMes = jQuery(this).children("#mes");
		var comboAnio = jQuery(this).children("#anio");
		var fechaHOY = new Date();
		var meses = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		var dias = new Array("Domingo","Lunes","Marte","Miercoles","Jueves","Viernes","Sabado");
		
		defaults ={
			num_dia: ( parseInt(fechaHOY.getDate() )< 10  )? "0"+(parseInt( fechaHOY.getDate() )) : parseInt(  fechaHOY.getDate()  ),
			num_mes: ( parseInt(fechaHOY.getMonth() )< 10  )? "0"+(parseInt( fechaHOY.getMonth() )+1) : parseInt(  fechaHOY.getMonth()  )+1,
			num_anio: fechaHOY.getFullYear(),
			dias_festivos : "_",   /*ingresar por pares dia/mes en numeros separado por coma ejemplo para 4 de enero  04/01  */
			adelantar_dia : 0,
			bloquear_dias_pasados:false,
			msj_bloqueo_dias_pasados:"No puede seleccionar dias previos a la fecha actual",
			msj_bloqueo_dias_festivos:"No puede seleccionar un dia festivo",
			msj_bloqueo_domingos:"No puede seleccionar dia domingo",
			msj_bloqueo_sabados:"No puede seleccionar dia sabado",
			bloquear_domingo: false,
			bloquear_sabado: false,
			bloquear_feriados: false
		};
		var options = $.extend({},defaults,options);
		
		fechaHOY.setDate( options.num_dia+options.adelantar_dia);
		options.num_dia=( parseInt(fechaHOY.getDate() )< 10  )? "0"+(parseInt( fechaHOY.getDate() )) : parseInt(  fechaHOY.getDate()  );
		options.num_mes= ( parseInt(fechaHOY.getMonth() )< 10  )? "0"+(parseInt( fechaHOY.getMonth() )+1) : parseInt(  fechaHOY.getMonth()  )+1;
		options.num_anio= fechaHOY.getFullYear();

		if( dias[fechaHOY.getDay]=="Domingo" )
		{
			fechaHOY.setDate( options.num_dia+1);
			options.num_dia= ( parseInt(fechaHOY.getDate() )< 10  )? "0"+(parseInt( fechaHOY.getDate() )) : parseInt(  fechaHOY.getDate()  );
			options.num_mes= ( parseInt(fechaHOY.getMonth() )< 10  )? "0"+(parseInt( fechaHOY.getMonth() )+1) : parseInt(  fechaHOY.getMonth()  )+1;
			options.num_anio= fechaHOY.getFullYear();

		}


		comboDia.val( options.num_dia);
		comboMes.val( options.num_mes);
		comboAnio.val( options.num_anio);

		/*se ejecuta cuando uno de los tres combos cambia*/
		jQuery("#"+comboDia.attr("id")+", #"+comboMes.attr("id")+", #"+comboAnio.attr("id")).change(function(){
        	var fechaSel = new Date();
        	flag=false;
			fechaSel.setFullYear(parseInt(comboAnio.val()), (parseInt( comboMes.val())-1), parseInt(comboDia.val()));  // es la fecha seleccionada diferente a la fecha actual del sistema
			
			if(fechaSel.getMonth()!= (parseInt(comboMes.val())-1) || fechaSel.getDate() != parseInt(comboDia.val() ) )
			{
				alert("Ha ocurrido un error inesperado. Seleccione nuevamente la fecha.")
				comboDia.val( options.num_dia);
				comboMes.val( options.num_mes);
				comboAnio.val( options.num_anio);
				return	false;
			}
			else 
			{
				alert(  Math.ceil( fechaSel.getTime()/un_dia)+" <  "+Math.ceil(fechaHOY.getTime()/un_dia) );
				if( (Math.ceil( fechaSel.getTime()/un_dia) <  Math.ceil(fechaHOY.getTime()/un_dia))  && options.bloquear_dias_pasados==true)
				{
					alert(options.msj_bloqueo_dias_pasados);
					flag=true;
				}
				var fecha_corta=  comboDia.val()+"/"+comboMes.val()
				/*Busca si es un dia feriado y si la funcion permite bloquear esos dias*/
				if(  options.dias_festivos.indexOf(fecha_corta)>0  && options.bloquear_feriados==true )
				{
					alert(options.msj_bloqueo_dias_festivos);
					flag=true
				}
				/*Busca si es un dia Domingo y si la funcion permite bloquear los Domingos*/
				if( dias[fechaSel.getDay()]=="Domingo" && options.bloquear_domingo )
				{
					alert(options.msj_bloqueo_domingos);
					flag=true
				}
				/*Busca si es un dia Sabado y si la funcion permite bloquear los Sabados*/
				if( dias[fechaSel.getDay()]=="Sabado" && options.bloquear_sabado )
				{
					alert(option.msj_bloqueo_sabados);
					flag=true
				}
				if(flag==true)
				{
				  	comboDia.val( options.num_dia);
					comboMes.val( options.num_mes);
					comboAnio.val( options.num_anio);
				}
			}
		});

	}
});

!(function($){var _baseDate=new Date();_baseDate.setHours(0);_baseDate.setMinutes(0);_baseDate.setSeconds(0);var _ONE_DAY=86400;var _defaults={className:null,minTime:null,maxTime:null,durationTime:null,step:30,showDuration:false,timeFormat:"g:ia",scrollDefaultNow:false,scrollDefaultTime:false,selectOnBlur:false};var _lang={decimal:".",mins:"mins",hr:"hr",hrs:"hrs"};var methods={init:function(options){return this.each(function(){var self=$(this);if(self[0].tagName=="SELECT"){var input=$("<input />");var attrs={"type":"text","value":self.val()};var raw_attrs=self[0].attributes;for(var i=0;i<raw_attrs.length;i++){attrs[raw_attrs[i].nodeName]=raw_attrs[i].nodeValue;}input.attr(attrs);self.replaceWith(input);self=input;}var settings=$.extend({},_defaults);if(options){settings=$.extend(settings,options);}if(settings.minTime){settings.minTime=_time2int(settings.minTime);}if(settings.maxTime){settings.maxTime=_time2int(settings.maxTime);}if(settings.durationTime){settings.durationTime=_time2int(settings.durationTime);}if(settings.lang){_lang=$.extend(_lang,settings.lang);}self.data("timepicker-settings",settings);self.attr("autocomplete","off");self.click(methods.show).focus(methods.show).blur(_formatValue).keydown(_keyhandler);self.addClass("ui-timepicker-input");if(self.val()){var prettyTime=_int2time(_time2int(self.val()),settings.timeFormat);self.val(prettyTime);}$("body").attr("tabindex",-1).focusin(function(e){if($(e.target).closest(".ui-timepicker-input").length==0&&$(e.target).closest(".ui-timepicker-list").length==0){methods.hide();}});});},show:function(e){var self=$(this);var list=self.data("timepicker-list");if(!list||list.length==0){_render(self);list=self.data("timepicker-list");}if(self.hasClass("ui-timepicker-hideme")){self.removeClass("ui-timepicker-hideme");list.hide();return;}if(list.is(":visible")){return;}methods.hide();var topMargin=parseInt(self.css("marginTop").slice(0,-2));if(!topMargin){topMargin=0;}if((self.offset().top+self.outerHeight(true)+list.outerHeight())>$(window).height()+$(window).scrollTop()){list.css({"left":(self.offset().left),"top":self.offset().top+topMargin-list.outerHeight()});}else{list.css({"left":(self.offset().left),"top":self.offset().top+topMargin+self.outerHeight()});}list.show();var settings=self.data("timepicker-settings");var selected=list.find(".ui-timepicker-selected");if(!selected.length){if(self.val()){selected=_findRow(self,list,_time2int(self.val()));}else{if(settings.minTime===null&&settings.scrollDefaultNow){selected=_findRow(self,list,_time2int(new Date()));}else{if(settings.scrollDefaultTime!==false){selected=_findRow(self,list,_time2int(settings.scrollDefaultTime));}}}}if(selected&&selected.length){var topOffset=list.scrollTop()+selected.position().top-selected.outerHeight();list.scrollTop(topOffset);}else{list.scrollTop(0);}self.trigger("showTimepicker");},hide:function(e){$(".ui-timepicker-list:visible").each(function(){var list=$(this);var self=list.data("timepicker-input");var settings=self.data("timepicker-settings");if(settings.selectOnBlur){_selectValue(self);}list.hide();self.trigger("hideTimepicker");});},option:function(key,value){var self=$(this);var settings=self.data("timepicker-settings");var list=self.data("timepicker-list");if(typeof key=="object"){settings=$.extend(settings,key);}else{if(typeof key=="string"&&typeof value!="undefined"){settings[key]=value;}else{if(typeof key=="string"){return settings[key];}}}if(settings.minTime){settings.minTime=_time2int(settings.minTime);}if(settings.maxTime){settings.maxTime=_time2int(settings.maxTime);}if(settings.durationTime){settings.durationTime=_time2int(settings.durationTime);}self.data("timepicker-settings",settings);if(list){list.remove();self.data("timepicker-list",false);}},getSecondsFromMidnight:function(){return _time2int($(this).val());},getTime:function(){return new Date(_baseDate.valueOf()+(_time2int($(this).val())*1000));},setTime:function(value){var self=$(this);var prettyTime=_int2time(_time2int(value),self.data("timepicker-settings").timeFormat);self.val(prettyTime);}};function _render(self){var settings=self.data("timepicker-settings");var list=self.data("timepicker-list");if(list&&list.length){list.remove();self.data("timepicker-list",false);}list=$("<ul />");list.attr("tabindex",-1);list.addClass("ui-timepicker-list");if(settings.className){list.addClass(settings.className);}list.css({"display":"none","position":"absolute"});if(settings.minTime!==null&&settings.showDuration){list.addClass("ui-timepicker-with-duration");}var durStart=(settings.durationTime!==null)?settings.durationTime:settings.minTime;var start=(settings.minTime!==null)?settings.minTime:0;var end=(settings.maxTime!==null)?settings.maxTime:(start+_ONE_DAY-1);if(end<=start){end+=_ONE_DAY;}for(var i=start;i<=end;i+=settings.step*60){var timeInt=i%_ONE_DAY;var row=$("<li />");row.data("time",timeInt);row.text(_int2time(timeInt,settings.timeFormat));if(settings.minTime!==null&&settings.showDuration){var duration=$("<span />");duration.addClass("ui-timepicker-duration");duration.text(" ("+_int2duration(i-durStart)+")");row.append(duration);}list.append(row);}list.data("timepicker-input",self);self.data("timepicker-list",list);$("body").append(list);_setSelected(self,list);list.delegate("li","click",{"timepicker":self},function(e){self.addClass("ui-timepicker-hideme");self[0].focus();list.find("li").removeClass("ui-timepicker-selected");$(this).addClass("ui-timepicker-selected");_selectValue(self);list.hide();});}function _findRow(self,list,value){if(!value&&value!==0){return false;}var settings=self.data("timepicker-settings");var out=false;list.find("li").each(function(i,obj){var jObj=$(obj);if(Math.abs(jObj.data("time")-value)<=settings.step*30){out=jObj;return false;}});return out;}function _setSelected(self,list){var timeValue=_time2int(self.val());var selected=_findRow(self,list,timeValue);if(selected){selected.addClass("ui-timepicker-selected");}}function _formatValue(){if(this.value==""){return;}var self=$(this);var prettyTime=_int2time(_time2int(this.value),self.data("timepicker-settings").timeFormat);self.val(prettyTime);}function _keyhandler(e){var self=$(this);var list=self.data("timepicker-list");if(!list.is(":visible")){if(e.keyCode==40){self.focus();}else{return true;}}switch(e.keyCode){case 13:_selectValue(self);methods.hide.apply(this);e.preventDefault();return false;break;case 38:var selected=list.find(".ui-timepicker-selected");if(!selected.length){var selected;list.children().each(function(i,obj){if($(obj).position().top>0){selected=$(obj);return false;}});selected.addClass("ui-timepicker-selected");}else{if(!selected.is(":first-child")){selected.removeClass("ui-timepicker-selected");selected.prev().addClass("ui-timepicker-selected");if(selected.prev().position().top<selected.outerHeight()){list.scrollTop(list.scrollTop()-selected.outerHeight());}}}break;case 40:var selected=list.find(".ui-timepicker-selected");if(selected.length==0){var selected;list.children().each(function(i,obj){if($(obj).position().top>0){selected=$(obj);return false;}});selected.addClass("ui-timepicker-selected");}else{if(!selected.is(":last-child")){selected.removeClass("ui-timepicker-selected");selected.next().addClass("ui-timepicker-selected");if(selected.next().position().top+2*selected.outerHeight()>list.outerHeight()){list.scrollTop(list.scrollTop()+selected.outerHeight());}}}break;case 27:list.find("li").removeClass("ui-timepicker-selected");list.hide();break;case 9:case 16:case 17:case 18:case 19:case 20:case 33:case 34:case 35:case 36:case 37:case 39:case 45:return;default:list.find("li").removeClass("ui-timepicker-selected");return;}}function _selectValue(self){var settings=self.data("timepicker-settings");var list=self.data("timepicker-list");var timeValue=null;var cursor=list.find(".ui-timepicker-selected");if(cursor.length){var timeValue=cursor.data("time");}else{if(self.val()){var timeValue=_time2int(self.val());_setSelected(self,list);}}if(timeValue!==null){var timeString=_int2time(timeValue,settings.timeFormat);self.attr("value",timeString);}self.trigger("change").trigger("changeTime");}function _int2duration(seconds){var minutes=Math.round(seconds/60);var duration;if(minutes<60){duration=[minutes,_lang.mins];}else{if(minutes==60){duration=["1",_lang.hr];}else{var hours=(minutes/60).toFixed(1);if(_lang.decimal!="."){hours=hours.replace(".",_lang.decimal);}duration=[hours,_lang.hrs];}}return duration.join(" ");}function _int2time(seconds,format){var time=new Date(_baseDate.valueOf()+(seconds*1000));var output="";for(var i=0;i<format.length;i++){var code=format.charAt(i);switch(code){case"a":output+=(time.getHours()>11)?"pm":"am";break;case"A":output+=(time.getHours()>11)?"PM":"AM";break;case"g":var hour=time.getHours()%12;output+=(hour==0)?"12":hour;break;case"G":output+=time.getHours();break;case"h":var hour=time.getHours()%12;if(hour!=0&&hour<10){hour="0"+hour;}output+=(hour==0)?"12":hour;break;case"H":var hour=time.getHours();output+=(hour>9)?hour:"0"+hour;break;case"i":var minutes=time.getMinutes();output+=(minutes>9)?minutes:"0"+minutes;break;case"s":var seconds=time.getSeconds();output+=(seconds>9)?seconds:"0"+seconds;break;default:output+=code;}}return output;}function _time2int(timeString){if(timeString==""){return null;}if(timeString+0==timeString){return timeString;}if(typeof(timeString)=="object"){timeString=timeString.getHours()+":"+timeString.getMinutes();}var d=new Date(0);var time=timeString.toLowerCase().match(/(\d+)(?::(\d\d))?\s*([pa]?)/);if(!time){return null;}var hour=parseInt(time[1]*1);if(time[3]){if(hour==12){var hours=(time[3]=="p")?12:0;}else{var hours=(hour+(time[3]=="p"?12:0));}}else{var hours=hour;}var minutes=(time[2]*1||0);return hours*3600+minutes*60;}$.fn.timepicker=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof method==="object"||!method){return methods.init.apply(this,arguments);}else{$.error("Method "+method+" does not exist on jQuery.timepicker");}}};})(jQuery);
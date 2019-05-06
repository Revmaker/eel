!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.networkteamEel=e():t.networkteamEel=e()}(window,function(){return function(t){var e={};function s(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=2)}([function(t,e,s){var n,r;n=this,r=function(){function t(e,s,n){return this.id=++t.highestId,this.name=e,this.symbols=s,this.postprocess=n,this}function e(t,e,s,n){this.rule=t,this.dot=e,this.reference=s,this.data=[],this.wantedBy=n,this.isComplete=this.dot===t.symbols.length}function s(t,e){this.grammar=t,this.index=e,this.states=[],this.wants={},this.scannable=[],this.completed={}}function n(t,e){this.rules=t,this.start=e||this.rules[0].name;var s=this.byName={};this.rules.forEach(function(t){s.hasOwnProperty(t.name)||(s[t.name]=[]),s[t.name].push(t)})}function r(){this.reset("")}function o(t,e,o){if(t instanceof n){var i=t;o=e}else i=n.fromCompiled(t,e);for(var a in this.grammar=i,this.options={keepHistory:!1,lexer:i.lexer||new r},o||{})this.options[a]=o[a];this.lexer=this.options.lexer,this.lexerState=void 0;var l=new s(i,0);this.table=[l];l.wants[i.start]=[],l.predict(i.start),l.process(),this.current=0}return t.highestId=0,t.prototype.toString=function(t){function e(t){return t.literal?JSON.stringify(t.literal):t.type?"%"+t.type:t.toString()}var s=void 0===t?this.symbols.map(e).join(" "):this.symbols.slice(0,t).map(e).join(" ")+" ● "+this.symbols.slice(t).map(e).join(" ");return this.name+" → "+s},e.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)},e.prototype.nextState=function(t){var s=new e(this.rule,this.dot+1,this.reference,this.wantedBy);return s.left=this,s.right=t,s.isComplete&&(s.data=s.build()),s},e.prototype.build=function(){var t=[],e=this;do{t.push(e.right.data),e=e.left}while(e.left);return t.reverse(),t},e.prototype.finish=function(){this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,o.fail))},s.prototype.process=function(t){for(var e=this.states,s=this.wants,n=this.completed,r=0;r<e.length;r++){var i=e[r];if(i.isComplete){if(i.finish(),i.data!==o.fail){for(var a=i.wantedBy,l=a.length;l--;){var c=a[l];this.complete(c,i)}if(i.reference===this.index){var u=i.rule.name;(this.completed[u]=this.completed[u]||[]).push(i)}}}else{if("string"!=typeof(u=i.rule.symbols[i.dot])){this.scannable.push(i);continue}if(s[u]){if(s[u].push(i),n.hasOwnProperty(u)){var p=n[u];for(l=0;l<p.length;l++){var f=p[l];this.complete(i,f)}}}else s[u]=[i],this.predict(u)}}},s.prototype.predict=function(t){for(var s=this.grammar.byName[t]||[],n=0;n<s.length;n++){var r=s[n],o=this.wants[t],i=new e(r,0,this.index,o);this.states.push(i)}},s.prototype.complete=function(t,e){var s=t.nextState(e);this.states.push(s)},n.fromCompiled=function(e,s){var r=e.Lexer;e.ParserStart&&(s=e.ParserStart,e=e.ParserRules);var o=new n(e=e.map(function(e){return new t(e.name,e.symbols,e.postprocess)}),s);return o.lexer=r,o},r.prototype.reset=function(t,e){this.buffer=t,this.index=0,this.line=e?e.line:1,this.lastLineBreak=e?-e.col:0},r.prototype.next=function(){if(this.index<this.buffer.length){var t=this.buffer[this.index++];return"\n"===t&&(this.line+=1,this.lastLineBreak=this.index),{value:t}}},r.prototype.save=function(){return{line:this.line,col:this.index-this.lastLineBreak}},r.prototype.formatError=function(t,e){var s=this.buffer;if("string"==typeof s){var n=s.indexOf("\n",this.index);-1===n&&(n=s.length);var r=s.substring(this.lastLineBreak,n),o=this.index-this.lastLineBreak;return e+=" at line "+this.line+" col "+o+":\n\n",e+="  "+r+"\n",e+="  "+Array(o).join(" ")+"^"}return e+" at index "+(this.index-1)},o.fail={},o.prototype.feed=function(t){var e,n=this.lexer;for(n.reset(t,this.lexerState);e=n.next();){var o=this.table[this.current];this.options.keepHistory||delete this.table[this.current-1];var i=this.current+1,a=new s(this.grammar,i);this.table.push(a);for(var l=void 0!==e.text?e.text:e.value,c=n.constructor===r?e.value:e,u=o.scannable,p=u.length;p--;){var f=u[p],m=f.rule.symbols[f.dot];if(m.test?m.test(c):m.type?m.type===e.type:m.literal===l){var h=f.nextState({data:c,token:e,isToken:!0,reference:i-1});a.states.push(h)}}if(a.process(),0===a.states.length){var b=this.lexer.formatError(e,"invalid syntax")+"\n";b+="Unexpected "+(e.type?e.type+" token: ":""),b+=JSON.stringify(void 0!==e.value?e.value:e)+"\n";var y=new Error(b);throw y.offset=this.current,y.token=e,y}this.options.keepHistory&&(o.lexerState=n.save()),this.current++}return o&&(this.lexerState=n.save()),this.results=this.finish(),this},o.prototype.save=function(){var t=this.table[this.current];return t.lexerState=this.lexerState,t},o.prototype.restore=function(t){var e=t.index;this.current=e,this.table[e]=t,this.table.splice(e+1),this.lexerState=t.lexerState,this.results=this.finish()},o.prototype.rewind=function(t){if(!this.options.keepHistory)throw new Error("set option `keepHistory` to enable rewinding");this.restore(this.table[t])},o.prototype.finish=function(){var t=[],e=this.grammar.start;return this.table[this.table.length-1].states.forEach(function(s){s.rule.name===e&&s.dot===s.rule.symbols.length&&0===s.reference&&s.data!==o.fail&&t.push(s)}),t.map(function(t){return t.data})},{Parser:o,Grammar:n,Rule:t}},t.exports?t.exports=r():n.nearley=r()},function(t,e,s){!function(){function e(t){return t[0]}var s={Lexer:void 0,ParserRules:[{name:"expression",symbols:["conditional"],postprocess:function(t){return t[0]}},{name:"conditional",symbols:["disjunction","_",{literal:"?"},"_","expression","_",{literal:":"},"_","expression"],postprocess:function(t){return t[0]+"?"+t[4]+":"+t[8]}},{name:"conditional",symbols:["disjunction"]},{name:"parens",symbols:[{literal:"("},"_","expression","_",{literal:")"}],postprocess:function(t){return"("+t[2]+")"}},{name:"parens",symbols:["atom"],postprocess:function(t){return t[0]}},{name:"disjunction$string$1",symbols:[{literal:"|"},{literal:"|"}],postprocess:function(t){return t.join("")}},{name:"disjunction",symbols:["disjunction","_","disjunction$string$1","_","conjunction"],postprocess:function(t){return t[0]+"||"+t[4]}},{name:"disjunction",symbols:["conjunction"],postprocess:function(t){return t[0]}},{name:"conjunction$string$1",symbols:[{literal:"&"},{literal:"&"}],postprocess:function(t){return t.join("")}},{name:"conjunction",symbols:["conjunction","_","conjunction$string$1","_","comparison"],postprocess:function(t){return t[0]+"&&"+t[4]}},{name:"conjunction",symbols:["comparison"],postprocess:function(t){return t[0]}},{name:"comparison",symbols:["comparison","_","COMPARISON_OP","_","sumcalc"],postprocess:function(t){return t[0]+t[2]+t[4]}},{name:"comparison",symbols:["sumcalc"],postprocess:function(t){return t[0]}},{name:"sumcalc",symbols:["sumcalc","_","SUM_OP","_","prodcalc"],postprocess:function(t){return t[0]+t[2]+t[4]}},{name:"sumcalc",symbols:["prodcalc"],postprocess:function(t){return t[0]}},{name:"prodcalc",symbols:["prodcalc","_","PROD_OP","_","negation"],postprocess:function(t){return t[0]+t[2]+t[4]}},{name:"prodcalc",symbols:["negation"],postprocess:function(t){return t[0]}},{name:"negation",symbols:[{literal:"!"},"_","negation"],postprocess:function(t){return"!"+t[2]}},{name:"negation",symbols:["parens"],postprocess:function(t){return t[0]}},{name:"atom",symbols:["IDENTIFIER"],postprocess:function(t){return t[0]}},{name:"atom",symbols:["NUMBER"],postprocess:function(t){return t[0]}},{name:"atom",symbols:["dqstring"],postprocess:function(t){return t[0]}},{name:"atom",symbols:["sqstring"],postprocess:function(t){return t[0]}},{name:"IDENTIFIER$ebnf$1",symbols:[]},{name:"IDENTIFIER$ebnf$1",symbols:["IDENTIFIER$ebnf$1",/[a-zA-Z_0-9]/],postprocess:function(t){return t[0].concat([t[1]])}},{name:"IDENTIFIER",symbols:[/[a-zA-Z_]/,"IDENTIFIER$ebnf$1"],postprocess:function(t){return"ctx."+t[0]+t[1].join("")}},{name:"NUMBER$ebnf$1",symbols:[{literal:"-"}],postprocess:e},{name:"NUMBER$ebnf$1",symbols:[],postprocess:function(t){return null}},{name:"NUMBER$ebnf$2",symbols:[/[0-9]/]},{name:"NUMBER$ebnf$2",symbols:["NUMBER$ebnf$2",/[0-9]/],postprocess:function(t){return t[0].concat([t[1]])}},{name:"NUMBER",symbols:["NUMBER$ebnf$1","NUMBER$ebnf$2"],postprocess:function(t){return parseInt((t[0]||"")+t[1].join(""),10)}},{name:"COMPARISON_OP$string$1",symbols:[{literal:"="},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$1"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP$string$2",symbols:[{literal:"!"},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$2"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP$string$3",symbols:[{literal:"<"},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$3"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP$string$4",symbols:[{literal:">"},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$4"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP",symbols:[{literal:"<"}],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP",symbols:[{literal:">"}],postprocess:function(t){return t[0]}},{name:"SUM_OP",symbols:[{literal:"+"}],postprocess:function(t){return t[0]}},{name:"SUM_OP",symbols:[{literal:"-"}],postprocess:function(t){return t[0]}},{name:"PROD_OP",symbols:[{literal:"*"}],postprocess:function(t){return t[0]}},{name:"PROD_OP",symbols:[{literal:"/"}],postprocess:function(t){return t[0]}},{name:"PROD_OP",symbols:[{literal:"%"}],postprocess:function(t){return t[0]}},{name:"dqstring$ebnf$1",symbols:[]},{name:"dqstring$ebnf$1",symbols:["dqstring$ebnf$1","dstrchar"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"dqstring",symbols:[{literal:'"'},"dqstring$ebnf$1",{literal:'"'}],postprocess:function(t){return'"'+t[1].join("")+'"'}},{name:"dstrchar",symbols:[/[^\\"\n]/],postprocess:e},{name:"dstrchar",symbols:[{literal:"\\"},"strescape"],postprocess:function(t){return t.join("")}},{name:"sqstring$ebnf$1",symbols:[]},{name:"sqstring$ebnf$1",symbols:["sqstring$ebnf$1","sstrchar"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"sqstring",symbols:[{literal:"'"},"sqstring$ebnf$1",{literal:"'"}],postprocess:function(t){return"'"+t[1].join("")+"'"}},{name:"sstrchar",symbols:[/[^\\'\n]/],postprocess:e},{name:"sstrchar",symbols:[{literal:"\\"},"strescape"],postprocess:function(t){return t.join("")}},{name:"strescape",symbols:[/["'\\\/bfnrt]/],postprocess:e},{name:"strescape",symbols:[{literal:"u"},/[a-fA-F0-9]/,/[a-fA-F0-9]/,/[a-fA-F0-9]/,/[a-fA-F0-9]/],postprocess:function(t){return t.join("")}},{name:"_$ebnf$1",symbols:[]},{name:"_$ebnf$1",symbols:["_$ebnf$1",/[\s]/],postprocess:function(t){return t[0].concat([t[1]])}},{name:"_",symbols:["_$ebnf$1"],postprocess:function(t){return null}}],ParserStart:"expression"};void 0!==t.exports?t.exports=s:window.grammar=s}()},function(t,e,s){"use strict";s.r(e);var n=s(0),r=s.n(n),o=s(1),i=s.n(o),a=r.a.Grammar.fromCompiled(i.a);function l(t){var e=new r.a.Parser(a);if(e.feed(t),!e.results||0===e.results.length)throw new Error("empty expression");var s="return ".concat(e.results[0],";");return new Function("ctx",s)}s.d(e,"compile",function(){return l})}])});
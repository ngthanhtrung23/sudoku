(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{44:function(e,t,n){e.exports=n(63)},57:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);n(45);var r=n(0),a=n.n(r),i=n(17),l=n.n(i),o=n(18),c=n(42),s=n(8),u=n(24),h=n(5),d=n(7),p=n(9),f=n(14),v=n(13),g=n(19),w=n(15),m=n(12),O=n(10),b=n.n(O),y=n(22),S=function(e,t){return new Set(Object(w.a)(e).filter((function(e){return t.has(e)})))},k=function(){function e(t){Object(d.a)(this,e),this.value=void 0,this.cornerValues=void 0,this.centerValues=void 0,this.selected=void 0,this.restricted=void 0,this.error=void 0,this.row=void 0,this.col=void 0,this.id=void 0,this.isFixed=void 0,this.value=null,this.cornerValues=new Set,this.centerValues=new Set,this.selected=!1,this.restricted=!1,this.error=!1,this.isFixed=!1,this.row=~~(t/9),this.col=t%9,this.id=t}return Object(p.a)(e,[{key:"isRegionTop",value:function(){return this.row%3===0}},{key:"isRegionBottom",value:function(){return this.row%3===2}},{key:"isRegionLeft",value:function(){return this.col%3===0}},{key:"isRegionRight",value:function(){return this.col%3===2}},{key:"isBoardTop",value:function(){return 0===this.row}},{key:"isBoardBottom",value:function(){return 8===this.row}},{key:"isBoardLeft",value:function(){return 0===this.col}},{key:"isBoardRight",value:function(){return 8===this.col}}]),e}(),C=function(){function e(t){Object(d.a)(this,e),this.value=void 0,this.selected=void 0,this.error=void 0,this.isFixed=void 0,this.id=void 0,this.id=t,this.value=null,this.selected=!1,this.error=!1,this.isFixed=!1}return Object(p.a)(e,[{key:"isValid",value:function(){return null===this.value||0===this.value||35===this.value||2<=this.value&&this.value<=33}}]),e}(),E=function(){function e(){Object(d.a)(this,e),this.cells=void 0,this.highlightMatching=void 0,this.multiSelectMode=void 0,this.rowSandwich=void 0,this.colSandwich=void 0,this.cells=[];for(var t=0;t<81;t++)this.cells.push(new k(t));this.highlightMatching=null,this.multiSelectMode=!1,this.rowSandwich=[],this.colSandwich=[];for(var n=0;n<9;n++)this.rowSandwich.push(new C("row-".concat(n))),this.colSandwich.push(new C("col-".concat(n)))}return Object(p.a)(e,[{key:"serialize",value:function(){var e=[];this.cells.forEach((function(t){e.push({value:t.value,fixed:t.isFixed,cornerValues:Array.from(t.cornerValues),centerValues:Array.from(t.centerValues)})}));var t={cells:e,rowSandwiches:this.rowSandwich.map((function(e){return{value:e.value,fixed:e.isFixed}})),colSandwiches:this.colSandwich.map((function(e){return{value:e.value,fixed:e.isFixed}}))};return JSON.stringify(t)}},{key:"load",value:function(e){this.clearAllErrors(),this.clearAllRestricteds(),this.clearAllSelections();for(var t=JSON.parse(e),n=t.cells,r=0;r<81;r++)this.cells[r].value=n[r].value,this.cells[r].isFixed=n[r].fixed,this.cells[r].cornerValues=new Set(n[r].cornerValues),this.cells[r].centerValues=new Set(n[r].centerValues);for(var a=0;a<9;a++)this.rowSandwich[a].value=t.rowSandwiches[a].value,this.rowSandwich[a].isFixed=t.rowSandwiches[a].fixed,this.colSandwich[a].value=t.colSandwiches[a].value,this.colSandwich[a].isFixed=t.colSandwiches[a].fixed}},{key:"isInside",value:function(e,t){return 0<=e&&e<9&&0<=t&&t<9}},{key:"toCellId",value:function(e,t){return 9*e+t}},{key:"toRowCol",value:function(e){return[~~(e/9),e%9]}},{key:"getRegionByPosition",value:function(e,t){return 3*~~(e/3)+~~(t/3)}},{key:"getRegion",value:function(e){var t=this.toRowCol(e),n=Object(g.a)(t,2),r=n[0],a=n[1];return this.getRegionByPosition(r,a)}},{key:"getVisibleCells",value:function(e,t){for(var n=this.toRowCol(e),r=Object(g.a)(n,2),a=r[0],i=r[1],l=new Set,o=0;o<9;o++)l.add(this.toCellId(a,o));for(var c=0;c<9;c++)l.add(this.toCellId(c,i));for(var s=this.getRegion(e),u=0;u<81;u++)this.getRegion(u)===s&&l.add(u);if(t.antiKnight)for(var h=-2;h<=2;h++)for(var d=-2;d<=2;d++)if(h*h+d*d===5){var p=a+h,f=i+d;this.isInside(p,f)&&l.add(this.toCellId(p,f))}if(t.antiKing)for(var v=-1;v<=1;v++)for(var w=-1;w<=1;w++){var m=a+v,O=i+w;this.isInside(m,O)&&l.add(this.toCellId(m,O))}return l.delete(e),l}},{key:"getInvalidCellIds",value:function(e){for(var t=this,n=new Set,r=function(r){var a=t.cells[r].value;a&&t.getVisibleCells(r,e).forEach((function(e){a===t.cells[e].value&&(n.add(r),n.add(e))}))},a=0;a<81;a++)r(a);return n}},{key:"getPossibleValues",value:function(e,t){var n,r,a=this,i=Array.from(this.getVisibleCells(e,t)).map((function(e){return a.cells[e].value})).filter((function(e){return e}));return n=new Set(["1","2","3","4","5","6","7","8","9"]),r=new Set(i),new Set(Object(w.a)(n).filter((function(e){return!r.has(e)})))}},{key:"fillAllPossibleValues",value:function(e){var t=this;this.cells.forEach((function(n){n.value||(n.centerValues=t.getPossibleValues(n.id,e))}))}},{key:"hasSelected",value:function(){return void 0!==this.cells.find((function(e){return e.selected}))}},{key:"hasSandwichSelected",value:function(){return void 0!==this.rowSandwich.find((function(e){return e.selected}))||void 0!==this.colSandwich.find((function(e){return e.selected}))}},{key:"getSandwichSum",value:function(e){if(e.indexOf("1")<0||e.indexOf("9")<0)return null;var t,n=Math.min(e.indexOf("1"),e.indexOf("9")),r=Math.max(e.indexOf("1"),e.indexOf("9")),a=0,i=Object(y.a)(e.slice(n+1,r));try{for(i.s();!(t=i.n()).done;){var l=t.value;if(null===l)return null;a+=+l}}catch(o){i.e(o)}finally{i.f()}return a}},{key:"getRowValues",value:function(e){return this.cells.slice(9*e,9*e+9).map((function(e){return e.value}))}},{key:"getColValues",value:function(e){return this.cells.filter((function(t){return t.id%9===e})).map((function(e){return e.value}))}},{key:"getRowSandwichSum",value:function(e){return this.getSandwichSum(this.getRowValues(e))}},{key:"getColSandwichSum",value:function(e){return this.getSandwichSum(this.getColValues(e))}},{key:"setSelected",value:function(e){this.cells[e].selected=!0}},{key:"getSelectedValues",value:function(){return new Set(this.cells.filter((function(e){return e.selected})).filter((function(e){return e.value})).map((function(e){return e.value})))}},{key:"setRestricted",value:function(e){for(var t=this,n=null,r=0;r<81;r++)this.cells[r].selected&&(n=null===n?this.getVisibleCells(r,e):S(this.getVisibleCells(r,e),n));n&&n.forEach((function(e){t.cells[e].restricted=!0}))}},{key:"setErrors",value:function(e){var t=this;e.forEach((function(e){t.cells[e].error=!0}))}},{key:"setValueOfSingleCell",value:function(e,t,n,r){var a=this;this.cells[e].isFixed||(this.cells[e].value=t,r&&this.getVisibleCells(this.cells[e].id,n).forEach((function(e){a.cells[e].cornerValues.delete(t),a.cells[e].centerValues.delete(t)})))}},{key:"setValueOfSelectedCells",value:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.cells.forEach((function(a){a.selected&&n.setValueOfSingleCell(a.id,e,t,r)}))}},{key:"unsetSelectedCells",value:function(){this.cells.filter((function(e){return e.selected&&!e.isFixed})).forEach((function(e){e.value=null})),[].concat(Object(w.a)(this.rowSandwich),Object(w.a)(this.colSandwich)).filter((function(e){return e.selected})).forEach((function(e){e.value=null}))}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.cornerValues.has(e)?t.cornerValues.delete(e):t.cornerValues.add(e))}))}},{key:"clearCornerValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.cornerValues.clear()}))}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.centerValues.has(e)?t.centerValues.delete(e):t.centerValues.add(e))}))}},{key:"clearCenterValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.centerValues.clear()}))}},{key:"clearAllSelections",value:function(){this.cells.forEach((function(e){e.selected=!1})),this.rowSandwich.forEach((function(e){e.selected=!1})),this.colSandwich.forEach((function(e){e.selected=!1}))}},{key:"clearAllRestricteds",value:function(){this.cells.forEach((function(e){e.restricted=!1}))}},{key:"clearAllErrors",value:function(){this.cells.forEach((function(e){e.error=!1})),this.rowSandwich.forEach((function(e){e.error=!1})),this.colSandwich.forEach((function(e){e.error=!1}))}}]),e}(),j={type:"ACTION_NO_OP"},A=function(e){return e.id>=e.boards.length-1?j:{type:"ACTION_REDO",payload:{serialized:e.boards[e.id+1]}}},V=function(e){return 0===e.id?j:{type:"ACTION_UNDO",payload:{serialized:e.boards[e.id-1]}}},N=function(e){return{type:"ACTION_UPDATE_BOARD",payload:{board:e}}},x=function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=b.a.cloneDeep(e);if(null!==a&&(i.multiSelectMode=a),r?(i.clearAllSelections(),i.clearAllRestricteds(),i.highlightMatching=null):i.clearAllRestricteds(),i.setSelected(n),t.displayOptions.highlightRestricted&&i.setRestricted(t.gameOptions),t.displayOptions.highlightMatchingNumbers){i.highlightMatching=null;var l=i.getSelectedValues();if(1===l.size){var o=l.values().next().value;i.highlightMatching=o}}return N(i)},D=function(e,t,n,r){var a=b.a.cloneDeep(e);if(!t.gameOptions.sandwich)throw new Error("Attempt to select sandwich in normal mode");return a.clearAllSelections(),a.clearAllRestricteds(),a.highlightMatching=null,n?a.rowSandwich[r].selected=!0:a.colSandwich[r].selected=!0,N(a)},R=function(e,t,n,r){for(var a=0,i=0,l=0;l<81;l++)if(e.cells[l].selected){var o=e.toRowCol(l),c=Object(g.a)(o,2);a=c[0],i=c[1];break}for(var s=0;s<9;s++){if(e.colSandwich[s].selected){a=-1,i=s;break}e.rowSandwich[s].selected&&(a=s,i=-1)}return t.gameOptions.sandwich?(i=(i+r+10)%10,9===(a=(a+n+10)%10)&&9===i?D(e,t,!1,0):9===a?D(e,t,!1,i):9===i?D(e,t,!0,a):x(e,t,e.toCellId(a,i))):(a=(a+n+9)%9,i=(i+r+9)%9,x(e,t,e.toCellId(a,i)))},T=function(e){return 16843009*((e=(858993459&(e-=e>>1&1431655765))+(e>>2&858993459))+(e>>4)&252645135)>>24},M=function(e,t){return(e>>t&1)>0},_=function(e,t){return M(e,t)?e-(1<<t):e},I={0:[[]],2:[[2]],3:[[3]],4:[[4]],5:[[5],[2,3]],6:[[6],[2,4]],7:[[7],[2,5],[3,4]],8:[[8],[2,6],[3,5]],9:[[2,7],[3,6],[4,5],[2,3,4]],10:[[2,8],[3,7],[4,6],[2,3,5]],11:[[3,8],[4,7],[5,6],[2,3,6],[2,4,5]],12:[[4,8],[5,7],[2,3,7],[2,4,6],[3,4,5]],13:[[5,8],[6,7],[2,3,8],[2,4,7],[2,5,6],[3,4,6]],14:[[6,8],[2,4,8],[2,5,7],[3,4,7],[3,5,6],[2,3,4,5]],15:[[7,8],[2,5,8],[2,6,7],[3,4,8],[3,5,7],[4,5,6],[2,3,4,6]],16:[[2,6,8],[3,5,8],[3,6,7],[4,5,7],[2,3,4,7],[2,3,5,6]],17:[[2,7,8],[3,6,8],[4,5,8],[4,6,7],[2,3,4,8],[2,3,5,7],[2,4,5,6]],18:[[3,7,8],[4,6,8],[5,6,7],[2,3,5,8],[2,3,6,7],[2,4,5,7],[3,4,5,6]],19:[[4,7,8],[5,6,8],[2,3,6,8],[2,4,5,8],[2,4,6,7],[3,4,5,7]],20:[[5,7,8],[2,3,7,8],[2,4,6,8],[2,5,6,7],[3,4,5,8],[3,4,6,7],[2,3,4,5,6]],21:[[6,7,8],[2,4,7,8],[2,5,6,8],[3,4,6,8],[3,5,6,7],[2,3,4,5,7]],22:[[2,5,7,8],[3,4,7,8],[3,5,6,8],[4,5,6,7],[2,3,4,5,8],[2,3,4,6,7]],23:[[2,6,7,8],[3,5,7,8],[4,5,6,8],[2,3,4,6,8],[2,3,5,6,7]],24:[[3,6,7,8],[4,5,7,8],[2,3,4,7,8],[2,3,5,6,8],[2,4,5,6,7]],25:[[4,6,7,8],[2,3,5,7,8],[2,4,5,6,8],[3,4,5,6,7]],26:[[5,6,7,8],[2,3,6,7,8],[2,4,5,7,8],[3,4,5,6,8]],27:[[2,4,6,7,8],[3,4,5,7,8],[2,3,4,5,6,7]],28:[[2,5,6,7,8],[3,4,6,7,8],[2,3,4,5,6,8]],29:[[3,5,6,7,8],[2,3,4,5,7,8]],30:[[4,5,6,7,8],[2,3,4,6,7,8]],31:[[2,3,5,6,7,8]],32:[[2,4,5,6,7,8]],33:[[3,4,5,6,7,8]],35:[[2,3,4,5,6,7,8]]},U={0:[0],2:[1],3:[1],4:[1],5:[1,2],6:[1,2],7:[1,2],8:[1,2],9:[2,3],10:[2,3],11:[2,3],12:[2,3],13:[2,3],14:[2,3,4],15:[2,3,4],16:[3,4],17:[3,4],18:[3,4],19:[3,4],20:[3,4,5],21:[3,4,5],22:[4,5],23:[4,5],24:[4,5],25:[4,5],26:[4,5],27:[5,6],28:[5,6],29:[5,6],30:[5,6],31:[6],32:[6],33:[6],35:[7]},F=function(e){return~~(e/9)},P=function(e){return e%9},L=function(e,t){return 9*e+t},B=function(e,t){if(0===e)return[new Set,new Set([1,2,3,4,5,6,7,8,9])];var n=t.indexOf(1),r=t.indexOf(9);if(n>r){var a=[r,n];n=a[0],r=a[1]}var i,l=r-n-1,o=new Set,c=new Set,s=!1,u=Object(y.a)(t);try{for(u.s();!(i=u.n()).done;){var h=i.value;0!==h&&(1===h||9===h?s=!s:s?o.add(h):c.add(h))}}catch(A){u.e(A)}finally{u.f()}var d,p=new Set,f=new Set,v=Object(y.a)(I[e]);try{for(v.s();!(d=v.n()).done;){var g=d.value,w=new Set(g),m=!0;g.length!==l&&(m=!1);var O,b=Object(y.a)(o);try{for(b.s();!(O=b.n()).done;){var S=O.value;if(!w.has(S)){m=!1;break}}}catch(A){b.e(A)}finally{b.f()}var k,C=Object(y.a)(c);try{for(C.s();!(k=C.n()).done;){var E=k.value;if(w.has(E)){m=!1;break}}}catch(A){C.e(A)}finally{C.f()}if(m)for(var j=1;j<=9;j++)w.has(j)?p.add(j):f.add(j)}}catch(A){v.e(A)}finally{v.f()}return[p,f]},K=function(e,t,n,r,a){if(null!==e.rowSandwich[t].value){var i=function(e,t){return t.slice(9*e,9*e+9)}(t,r),l=e.rowSandwich[t].value;if(i.indexOf(1)>=0&&i.indexOf(9)>=0){for(var o=B(l,i),c=Object(g.a)(o,2),s=c[0],u=c[1],h=!1,d=0;d<9;d++)if(1===i[d]||9===i[d])h=!h;else if(0===i[d])for(var p=1;p<=9;p++){var f=L(t,d);(h&&!s.has(p)||!h&&!u.has(p))&&(a[f]=_(a[f],p))}}else if(i.indexOf(1)>=0||i.indexOf(9)>=0){var v=i.indexOf(1);v<0&&(v=i.indexOf(9));for(var w=new Set(U[l]),m=0;m<9;m++)if(0===i[m]&&!w.has(Math.abs(m-v)-1)){var O=L(t,m);a[O]=_(a[O],1),a[O]=_(a[O],9)}}}if(null!==e.colSandwich[n].value){var b=function(e,t){for(var n=[],r=e;r<81;r+=9)n.push(t[r]);return n}(n,r),y=e.colSandwich[n].value;if(b.indexOf(1)>=0&&b.indexOf(9)>=0){for(var S=B(y,b),k=Object(g.a)(S,2),C=k[0],E=k[1],j=!1,A=0;A<9;A++)if(1===b[A]||9===b[A])j=!j;else if(0===b[A])for(var V=1;V<=9;V++){var N=L(A,n);(j&&!C.has(V)||!j&&!E.has(V))&&(a[N]=_(a[N],V))}}else if(b.indexOf(1)>=0||b.indexOf(9)>=0){var x=b.indexOf(1);x<0&&(x=b.indexOf(9));for(var D=new Set(U[y]),R=0;R<9;R++)if(0===b[R]&&!D.has(Math.abs(R-x)-1)){var T=L(R,n);a[T]=_(a[T],1),a[T]=_(a[T],9)}}}},G=function e(t,n,r,a){for(var i=-1,l=0;l<81;l++)0===r[l]&&(i<0||T(r[l])<T(r[i]))&&(i=l);if(i<0){for(var o=b.a.cloneDeep(t),c=0;c<81;c++)o.setValueOfSingleCell(c,String.fromCharCode(48+r[c]),n.gameOptions,!1);return[o,1]}if(0===T(a[i]))return[null,0];for(var s=null,u=0,h=1;h<=9;h++)if(M(a[i],h)){var d=b.a.clone(r),p=b.a.clone(a);r[i]=h;var f,v=t.getVisibleCells(i,n.gameOptions),w=Object(y.a)(v);try{for(w.s();!(f=w.n()).done;){var m=f.value;a[m]=_(a[m],h)}}catch(E){w.e(E)}finally{w.f()}n.gameOptions.sandwich&&K(t,F(i),P(i),r,a);var O=e(t,n,r,a),S=Object(g.a)(O,2),k=S[0],C=S[1];if(C>0&&(null===s&&(s=k),(u+=C)>=2))break;r=d,a=p}return[s,u]},H=function(e,t){var n=b.a.cloneDeep(e);n.fillAllPossibleValues(t.gameOptions);var r=n.cells.map((function(e){return e.value?+e.value:0})),a=n.cells.map((function(e){var t,n=0,r=Object(y.a)(e.centerValues);try{for(r.s();!(t=r.n()).done;){var a=t.value;null!==a&&(n+=1<<+a)}}catch(i){r.e(i)}finally{r.f()}return n}));if(t.gameOptions.sandwich){for(var i=0;i<9;i++){if(!n.rowSandwich[i].isValid())return[null,0];if(!n.colSandwich[i].isValid())return[null,0]}for(var l=0;l<81;l++)r[l]>0&&K(n,F(l),P(l),r,a);for(var o=0;o<81;o++){r[o]>0&&(n.cells[o].value=String(r[o])),n.cells[o].centerValues.clear();for(var c=1;c<=9;c++)M(a[o],c)&&n.cells[o].centerValues.add(String(c))}return function e(t,n,r,a){for(var i=1e3,l=!1,o=-1,c=1,s=0;s<9;s++){if(null!==t.rowSandwich[s].value){for(var u=0,h=0,d=0;d<9;d++){var p=L(s,d);if(0===r[p]){var f=a[p];M(f,1)&&(u+=1),M(f,9)&&(h+=1)}}u>0&&u<i&&(i=u,l=!0,o=s,c=1),h>0&&h<i&&(i=h,l=!0,o=s,c=9)}if(null!==t.colSandwich[s].value){for(var v=0,w=0,m=0;m<9;m++){var O=L(m,s);if(0===r[O]){var S=a[O];M(S,1)&&(v+=1),M(S,9)&&(w+=1)}}v>0&&v<i&&(i=v,l=!1,o=s,c=1),w>0&&w<i&&(i=w,l=!1,o=s,c=9)}}if(o<0)return G(t,n,r,a);for(var k=null,C=0,E=0;E<9;E++){var j=l?L(o,E):L(E,o);if(0===r[j]&&M(a[j],c)){var A=b.a.clone(r),V=b.a.clone(a);r[j]=c;var N,x=t.getVisibleCells(j,n.gameOptions),D=Object(y.a)(x);try{for(D.s();!(N=D.n()).done;){var R=N.value;a[R]=_(a[R],c)}}catch(H){D.e(H)}finally{D.f()}n.gameOptions.sandwich&&K(t,F(j),P(j),r,a);var T=e(t,n,r,a),I=Object(g.a)(T,2),U=I[0],B=I[1];if(B>0&&(null===k&&(k=U),(C+=B)>=2))break;r=A,a=V}}return[k,C]}(n,t,r,a)}return G(n,t,r,a)},z=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderCellMainValue",value:function(){if(this.props.cell.value)return a.a.createElement("span",{className:"cell-main-value"},this.props.cell.value)}},{key:"shouldHighlightMatching",value:function(e){return this.props.highlightMatching&&e===this.props.highlightMatching}},{key:"renderCellCornerValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.cornerValues).sort().map((function(t){var n=e.shouldHighlightMatching(t)?"matching":"";return a.a.createElement("span",{className:n,key:"corner-"+e.props.cell.id+"-"+t},t)}));return a.a.createElement("span",{className:"cell-corner-value"},t)}}},{key:"renderCellCenterValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.centerValues).sort().map((function(t){var n=e.shouldHighlightMatching(t)?"matching":"";return a.a.createElement("span",{className:n,key:"center-"+e.props.cell.id+"-"+t},t)}));return a.a.createElement("span",{className:"cell-center-value"},t)}}},{key:"render",value:function(){var e=["cell"];return this.props.cell.isRegionTop()&&e.push("region-top"),this.props.cell.isRegionLeft()&&e.push("region-left"),this.props.cell.isBoardLeft()&&e.push("board-left"),this.props.cell.isBoardRight()&&e.push("board-right"),this.props.cell.isBoardTop()&&e.push("board-top"),this.props.cell.isBoardBottom()&&e.push("board-bottom"),this.props.cell.selected?e.push("selected"):this.shouldHighlightMatching(this.props.cell.value)?e.push("matching"):this.props.cell.restricted?e.push("restricted"):this.props.cell.isFixed?e.push("fixed"):this.props.cell.error&&e.push("error"),a.a.createElement("div",{className:e.join(" "),onClick:this.props.onClick,onMouseDown:this.props.onMouseDown,onMouseOver:this.props.onMouseOver,key:this.props.cell.id},this.renderCellMainValue(),this.renderCellCornerValues(),this.renderCellCenterValues())}}]),n}(a.a.Component),J=n(68),X=n(27),Y=n(26),q=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderSandwichHint",value:function(){if(this.props.sandwichHint&&null!==this.props.value.value&&0!==this.props.value.value){var e=I[this.props.value.value].map((function(e){return a.a.createElement("div",null,e.join(" "))})),t=a.a.createElement(Y.a,{id:"tooltip-sandwich-".concat(this.props.value.id)},a.a.createElement("div",null,e));return a.a.createElement("div",{className:"cell-corner-value"},a.a.createElement(X.a,{placement:"left",overlay:t},a.a.createElement(J.a,null)))}}},{key:"render",value:function(){var e=null===this.props.value.value?void 0:this.props.value.value,t=["sandwich-cell"];return this.props.value.selected?t.push("selected"):this.props.value.isFixed&&t.push("fixed"),this.props.value.error&&t.push("error"),a.a.createElement("div",{onClick:this.props.onClick,className:t.join(" ")},a.a.createElement("div",{className:"cell-main-value"},e),this.renderSandwichHint())}}]),n}(a.a.Component),Q=Object(o.b)((function(e){return{sandwichHint:e.control.displayOptions.sandwichHint}}))(q),W=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderCell",value:function(e){var t=this;return a.a.createElement(z,{cell:this.props.board.cells[e],onClick:function(n){return t.props.onClick(n,e)},onMouseDown:function(n){return t.props.onMouseDown(n,e)},onMouseOver:function(){return t.props.onMouseOver(e)},key:String(e),highlightMatching:this.props.board.highlightMatching})}},{key:"renderSandwichCell",value:function(e,t,n){var r=this,i=e?this.props.board.rowSandwich[t]:this.props.board.colSandwich[t];return a.a.createElement(Q,{value:i,key:n,onClick:function(n){return r.props.onSelectSandwich(n,e,t)}})}},{key:"renderEmptySandwichCell",value:function(){return a.a.createElement("div",{className:"sandwich-cell"})}},{key:"renderRow",value:function(e){var t=this,n=9*e,r=Object(w.a)(Array(9).keys()).map((function(e){return t.renderCell(n+e)})),i=null;return this.props.gameOptions.sandwich&&(i=this.renderSandwichCell(!0,e,"sandwich-row-".concat(e))),a.a.createElement("div",{className:"row",key:n},i,r)}},{key:"renderSandwichRow",value:function(){var e=this,t=Object(w.a)(Array(9).keys()).map((function(t){return e.renderSandwichCell(!1,t,"sandwich-col-".concat(t))}));return a.a.createElement("div",{className:"row"},this.renderEmptySandwichCell(),t)}},{key:"render",value:function(){var e=this,t=null;this.props.gameOptions.sandwich&&(t=this.renderSandwichRow());var n=Object(w.a)(Array(9).keys()).map((function(t){return e.renderRow(t)}));return a.a.createElement("div",null,t,n)}}]),n}(a.a.Component),Z=n(23),$=n(21),ee=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderSandwichDisplayOptions",value:function(){var e=this;return this.props.sandwich?a.a.createElement($.a.Check,{type:"checkbox",id:"checkbox-sandwich-hint",label:"Show Sandwich sum hints",checked:this.props.sandwichHint,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{sandwichHint:!e.props.sandwichHint}))}}):null}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{id:"display-options"},a.a.createElement("h4",null,"Display Options"),a.a.createElement($.a.Check,{type:"checkbox",id:"checkbox-highlight-restricted",label:"Highlight restricted cells",checked:this.props.highlightRestricted,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{highlightRestricted:!e.props.highlightRestricted}))}}),a.a.createElement($.a.Check,{type:"checkbox",id:"checkbox-highlight-matching-numbers",label:"Highlight matching numbers",checked:this.props.highlightMatchingNumbers,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{highlightMatchingNumbers:!e.props.highlightMatchingNumbers}))}}),a.a.createElement($.a.Check,{type:"checkbox",id:"checkbox-auto-cleanup",label:"Auto Cleanup corner & center values",checked:this.props.autoCleanUp,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{autoCleanUp:!e.props.autoCleanUp}))}}),this.renderSandwichDisplayOptions())}}]),n}(a.a.Component),te=Object(o.b)((function(e){return Object(h.a)(Object(h.a)({},e.control.displayOptions),e.control.gameOptions)}),{updateDisplay:function(e){return{type:"ACTION_UPDATE_DISPLAY",payload:e}}})(ee),ne=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderLabel",value:function(e,t,n){return a.a.createElement(X.a,{placement:"right",overlay:a.a.createElement(Y.a,{id:t},n)},a.a.createElement("span",null,e,"\xa0",a.a.createElement(J.a,null)))}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{id:"game-play"},a.a.createElement("h4",null,"Game Play"),a.a.createElement($.a.Check,{type:"checkbox",id:"checkbox-anti-knight",label:this.renderLabel("Anti Knight","tooltip-anti-knight","Two cells which are knight's move away from each other cannot contain the same digit."),checked:this.props.antiKnight,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{antiKnight:!e.props.antiKnight}))}}),a.a.createElement($.a.Check,{type:"checkbox",id:"checkbox-anti-king",label:this.renderLabel("Anti King","tooltip-anti-king","Two cells which are king's move away from each other cannot contain the same digit."),checked:this.props.antiKing,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{antiKing:!e.props.antiKing}))}}),a.a.createElement($.a.Check,{type:"checkbox",id:"checkbox-sandwich",label:this.renderLabel("Sandwich","tooltip-sandwich","The numbers in each row / column specify the sum between the number 1 and 9 in that row / column."),checked:this.props.sandwich,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{sandwich:!e.props.sandwich}))}}))}}]),n}(a.a.Component),re=Object(o.b)((function(e){return Object(h.a)({},e.control.gameOptions)}),{updateGameOptions:function(e){return{type:"ACTION_UPDATE_GAME_PLAY",payload:e}}})(ne),ae=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderUrl",value:function(){if(this.props.url)return a.a.createElement("a",{href:this.props.url},"Link")}},{key:"renderTooltip",value:function(e,t){return a.a.createElement(Y.a,{id:e},t)}},{key:"render",value:function(){return a.a.createElement($.a,null,a.a.createElement("div",{className:""},a.a.createElement(Z.a,{onClick:this.props.onClickVerify},"Verify"),"\xa0",a.a.createElement(Z.a,{onClick:this.props.onClickUndo,className:"btn-secondary"},"Undo"),"\xa0",a.a.createElement(Z.a,{onClick:this.props.onClickRedo,className:"btn-secondary"},"Redo")),a.a.createElement("hr",null),a.a.createElement(te,null),a.a.createElement("hr",null),a.a.createElement(re,null),a.a.createElement("hr",null),a.a.createElement("h4",null,"Help"),a.a.createElement(X.a,{placement:"top",overlay:this.renderTooltip("tooltip-fill-center","Show all possible values for each cell.")},a.a.createElement(Z.a,{onClick:this.props.onClickFillCenters,className:"btn-secondary"},"Fill all center values")),"\xa0",a.a.createElement(Z.a,{onClick:this.props.solve,className:"btn-secondary"},"Solve"),a.a.createElement("hr",null),a.a.createElement(Z.a,{onClick:this.props.generateUrl,className:"btn-secondary"},"Get URL"),"\xa0",this.renderUrl())}}]),n}(a.a.Component),ie=Object(o.b)((function(e){return{url:e.gameUrl}}))(ae),le=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"componentDidMount",value:function(){this.props.encoded&&this.props.initGameState(JSON.parse(window.atob(this.props.encoded)))}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{onKeyDown:function(t){return e.props.keyDown(e.props.board,e.props.control,e.props.history,t)},tabIndex:0,className:"container",onMouseUp:function(){return e.props.mouseUp(e.props.board)}},a.a.createElement("h1",null,a.a.createElement("a",{href:"/sudoku"},"Sudoku Tool")),a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"col-sm"},a.a.createElement(W,{board:this.props.board,gameOptions:this.props.control.gameOptions,onClick:function(t,n){return e.props.select(e.props.board,e.props.control,n,!t.metaKey)},onSelectSandwich:function(t,n,r){return e.props.selectSandwich(e.props.board,e.props.control,n,r)},onMouseDown:function(t,n){return e.props.mouseDown(e.props.board,e.props.control,n,!t.metaKey)},onMouseOver:function(t){return e.props.mouseOver(e.props.board,e.props.control,t)}})),a.a.createElement("div",{className:"col-sm"},a.a.createElement(ie,{onClickVerify:function(){return e.props.verify(e.props.board,e.props.control)},onClickUndo:function(){return e.props.undo(e.props.history)},onClickRedo:function(){return e.props.redo(e.props.history)},onClickFillCenters:function(){return e.props.fillCenter(e.props.board,e.props.control)},solve:function(){return e.props.solve(e.props.board,e.props.control)},generateUrl:function(){return e.props.generateUrl(e.props.board,e.props.control)}}))))}}]),n}(a.a.Component),oe=Object(o.b)((function(e,t){return Object(h.a)(Object(h.a)({},e),{},{encoded:t.match.params.encoded})}),{redo:A,undo:V,initGameState:function(e){for(var t=new E,n=0;n<81;n++){"0"!==e.values[n]&&(t.cells[n].value=e.values[n],t.cells[n].isFixed=!0)}if(null!==e.rowSandwichSums)for(var r=0;r<9;r++)t.rowSandwich[r].value=e.rowSandwichSums[r],t.rowSandwich[r].isFixed=!0;if(null!==e.colSandwichSums)for(var a=0;a<9;a++)t.colSandwich[a].value=e.colSandwichSums[a],t.colSandwich[a].isFixed=!0;return{type:"ACTION_INIT_GAME_STATE",payload:{board:t,gameOptions:e.gameOptions}}},generateUrl:function(e,t){var n={values:e.cells.map((function(e){return e.value?e.value:"0"})).join(""),rowSandwichSums:t.gameOptions.sandwich?e.rowSandwich.map((function(e){return e.value})):null,colSandwichSums:t.gameOptions.sandwich?e.colSandwich.map((function(e){return e.value})):null,gameOptions:t.gameOptions};return{type:"ACTION_GENERATE_URL",payload:{url:window.location.origin+window.location.pathname+"#/"+window.btoa(JSON.stringify(n))}}},keyDown:function(e,t,n,r){var a=!!r.shiftKey,i=!!r.metaKey;if(r.keyCode>=m.a&&r.keyCode<=m.b){if(r.keyCode!==m.a&&e.hasSelected()){var l=String.fromCharCode(r.keyCode);return a?function(e,t){var n=b.a.cloneDeep(e);return n.toggleCornerValuesOfSelectedCells(t),N(n)}(e,l):i?(r.preventDefault(),function(e,t){var n=b.a.cloneDeep(e);return n.toggleCenterValuesOfSelectedCells(t),N(n)}(e,l)):function(e,t,n){var r=b.a.cloneDeep(e);if(r.clearAllErrors(),r.setValueOfSelectedCells(n,t.gameOptions,t.displayOptions.autoCleanUp),t.displayOptions.highlightMatchingNumbers){r.highlightMatching=null;var a=r.getSelectedValues();if(1===a.size){var i=a.values().next().value;r.highlightMatching=i}}return N(r)}(e,t,l)}return e.hasSandwichSelected()?function(e,t){var n=b.a.cloneDeep(e);return n.clearAllErrors(),[].concat(Object(w.a)(n.rowSandwich),Object(w.a)(n.colSandwich)).filter((function(e){return e.selected})).forEach((function(e){null===e.value?e.value=t:e.value<10&&(e.value=10*e.value+t)})),N(n)}(e,+String.fromCharCode(r.keyCode)):j}switch(r.keyCode){case m.i:return function(e){var t=b.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),N(t)}(e);case m.c:return r.preventDefault(),function(e){var t=b.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),t.clearCornerValuesOfSelectedCells(),t.clearCenterValuesOfSelectedCells(),N(t)}(e);case m.d:return R(e,t,1,0);case m.k:return R(e,t,-1,0);case m.f:return R(e,t,0,-1);case m.h:return R(e,t,0,1);case m.e:return function(e){var t=b.a.cloneDeep(e);return t.clearAllSelections(),t.clearAllRestricteds(),t.highlightMatching=null,N(t)}(e);case m.m:case m.j:return V(n);case m.l:case m.g:return A(n)}return j},mouseDown:function(e,t,n,r){return x(e,t,n,r,!0)},mouseOver:function(e,t,n){return e.multiSelectMode?x(e,t,n,!1):j},mouseUp:function(e){return N(Object.assign(e,{multiSelectMode:!1}))},select:x,selectSandwich:D,fillCenter:function(e,t){var n=b.a.cloneDeep(e);return n.fillAllPossibleValues(t.gameOptions),N(n)},verify:function(e,t){var n=b.a.cloneDeep(e);n.clearAllSelections(),n.clearAllRestricteds(),n.clearAllErrors();var r=n.getInvalidCellIds(t.gameOptions);n.setErrors(r);for(var a=r.size>0,i=0;i<9;i++){if(n.rowSandwich[i].isValid()){var l=n.rowSandwich[i].value,o=n.getRowSandwichSum(i);null!==l&&null!==o&&l!==o&&(a=!0,n.rowSandwich[i].error=!0)}else a=!0,n.rowSandwich[i].error=!0;if(n.colSandwich[i].isValid()){var c=n.colSandwich[i].value,s=n.getColSandwichSum(i);null!==c&&null!==s&&c!==s&&(a=!0,n.colSandwich[i].error=!0)}else a=!0,n.colSandwich[i].error=!0}return alert(a?"Error found :(":"Looks good to me!"),N(n)},solve:function(e,t){var n=H(e,t),r=Object(g.a)(n,2),a=r[0],i=r[1];return i>=2?alert("Found at least "+i+" solutions."):alert("Found "+i+" solution."),null!==a?N(a):j}})(le),ce=(n(57),function e(){Object(d.a)(this,e),this.displayOptions=void 0,this.gameOptions=void 0,this.displayOptions={highlightRestricted:!0,highlightMatchingNumbers:!1,autoCleanUp:!1,sandwichHint:!1},this.gameOptions={antiKnight:!1,antiKing:!1,sandwich:!1}}),se=n(36),ue=n.n(se),he=function e(){Object(d.a)(this,e),this.boards=void 0,this.id=void 0,this.boards=[],this.id=0;var t=new E;this.boards.push(t.serialize())},de=Object(u.b)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new E,t=arguments.length>1?arguments[1]:void 0;if("ACTION_UPDATE_BOARD"===t.type)return t.payload.board;if("ACTION_UNDO"===t.type){var n=new E;return n.load(t.payload.serialized),n}if("ACTION_REDO"===t.type){var r=new E;return r.load(t.payload.serialized),r}return"ACTION_INIT_GAME_STATE"===t.type?t.payload.board:e},control:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new ce,t=arguments.length>1?arguments[1]:void 0;return"ACTION_UPDATE_DISPLAY"===t.type?Object(h.a)(Object(h.a)({},e),{},{displayOptions:t.payload}):"ACTION_UPDATE_GAME_PLAY"===t.type?Object(h.a)(Object(h.a)({},e),{},{gameOptions:t.payload}):"ACTION_INIT_GAME_STATE"===t.type?Object(h.a)(Object(h.a)({},e),{},{gameOptions:t.payload.gameOptions}):e},history:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new he,t=arguments.length>1?arguments[1]:void 0;if("ACTION_INIT_GAME_STATE"===t.type)return{boards:[t.payload.board.serialize()],id:0};if("ACTION_UPDATE_BOARD"===t.type){var n=t.payload.board.serialize();return n!==e.boards[e.id]&&(e.boards=e.boards.slice(0,e.id+1),e.boards.push(n),e.id+=1),e}return"ACTION_UNDO"===t.type?(ue()(e.id>0),Object(h.a)(Object(h.a)({},e),{},{id:e.id-1})):"ACTION_REDO"===t.type?(ue()(e.id+1<e.boards.length),Object(h.a)(Object(h.a)({},e),{},{id:e.id+1})):e},isMouseDown:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e},highlightMatching:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return e},gameUrl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"ACTION_GENERATE_URL"===t.type?t.payload.url:e}}),pe=Object(u.c)(de,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());l.a.render(a.a.createElement(o.a,{store:pe},a.a.createElement(c.a,null,a.a.createElement(s.a,{path:"/:encoded?",component:oe}))),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.6232c4f0.chunk.js.map
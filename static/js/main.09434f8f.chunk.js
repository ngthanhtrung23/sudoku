(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{59:function(e,t,n){e.exports=n(85)},79:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);n(60);var a=n(0),r=n.n(a),i=n(19),l=n.n(i),o=n(16),c=n(57),s=n(10),u=n(27),h=n(5),d=n(7),p=n(8),f=n(13),v=n(12),m=n(17),w=n(14),g=n(15),O=n(9),b=n.n(O),y=n(22),S=function(e,t){return new Set(Object(w.a)(e).filter((function(e){return t.has(e)})))},C=function(){function e(t){Object(d.a)(this,e),this.value=void 0,this.cornerValues=void 0,this.centerValues=void 0,this.selected=void 0,this.restricted=void 0,this.error=void 0,this.row=void 0,this.col=void 0,this.id=void 0,this.isFixed=void 0,this.color=void 0,this.value=null,this.cornerValues=new Set,this.centerValues=new Set,this.selected=!1,this.restricted=!1,this.error=!1,this.isFixed=!1,this.color=null,this.row=~~(t/9),this.col=t%9,this.id=t}return Object(p.a)(e,[{key:"isRegionTop",value:function(){return this.row%3===0}},{key:"isRegionBottom",value:function(){return this.row%3===2}},{key:"isRegionLeft",value:function(){return this.col%3===0}},{key:"isRegionRight",value:function(){return this.col%3===2}},{key:"isBoardTop",value:function(){return 0===this.row}},{key:"isBoardBottom",value:function(){return 8===this.row}},{key:"isBoardLeft",value:function(){return 0===this.col}},{key:"isBoardRight",value:function(){return 8===this.col}}]),e}(),k=function(){function e(t){Object(d.a)(this,e),this.value=void 0,this.selected=void 0,this.error=void 0,this.isFixed=void 0,this.id=void 0,this.id=t,this.value=null,this.selected=!1,this.error=!1,this.isFixed=!1}return Object(p.a)(e,[{key:"isValid",value:function(){return null===this.value||0===this.value||35===this.value||2<=this.value&&this.value<=33}}]),e}(),E=function(){function e(){Object(d.a)(this,e),this.cells=void 0,this.highlightMatching=void 0,this.multiSelectMode=void 0,this.rowSandwich=void 0,this.colSandwich=void 0,this.cells=[];for(var t=0;t<81;t++)this.cells.push(new C(t));this.highlightMatching=null,this.multiSelectMode=!1,this.rowSandwich=[],this.colSandwich=[];for(var n=0;n<9;n++)this.rowSandwich.push(new k("row-".concat(n))),this.colSandwich.push(new k("col-".concat(n)))}return Object(p.a)(e,[{key:"serialize",value:function(){var e=[];this.cells.forEach((function(t){e.push({value:t.value,fixed:t.isFixed,color:t.color,cornerValues:Array.from(t.cornerValues),centerValues:Array.from(t.centerValues)})}));var t={cells:e,rowSandwiches:this.rowSandwich.map((function(e){return{value:e.value,fixed:e.isFixed}})),colSandwiches:this.colSandwich.map((function(e){return{value:e.value,fixed:e.isFixed}}))};return JSON.stringify(t)}},{key:"load",value:function(e){this.clearAllErrors(),this.clearAllRestricteds(),this.clearAllSelections();for(var t=JSON.parse(e),n=t.cells,a=0;a<81;a++)this.cells[a].value=n[a].value,this.cells[a].isFixed=n[a].fixed,this.cells[a].color=n[a].color,this.cells[a].cornerValues=new Set(n[a].cornerValues),this.cells[a].centerValues=new Set(n[a].centerValues);for(var r=0;r<9;r++)this.rowSandwich[r].value=t.rowSandwiches[r].value,this.rowSandwich[r].isFixed=t.rowSandwiches[r].fixed,this.colSandwich[r].value=t.colSandwiches[r].value,this.colSandwich[r].isFixed=t.colSandwiches[r].fixed}},{key:"isInside",value:function(e,t){return 0<=e&&e<9&&0<=t&&t<9}},{key:"toCellId",value:function(e,t){return 9*e+t}},{key:"toRowCol",value:function(e){return[~~(e/9),e%9]}},{key:"getRegionByPosition",value:function(e,t){return 3*~~(e/3)+~~(t/3)}},{key:"getRegion",value:function(e){var t=this.toRowCol(e),n=Object(m.a)(t,2),a=n[0],r=n[1];return this.getRegionByPosition(a,r)}},{key:"getVisibleCells",value:function(e,t){for(var n=this.toRowCol(e),a=Object(m.a)(n,2),r=a[0],i=a[1],l=new Set,o=0;o<9;o++)l.add(this.toCellId(r,o));for(var c=0;c<9;c++)l.add(this.toCellId(c,i));for(var s=this.getRegion(e),u=0;u<81;u++)this.getRegion(u)===s&&l.add(u);if(t.antiKnight)for(var h=-2;h<=2;h++)for(var d=-2;d<=2;d++)if(h*h+d*d===5){var p=r+h,f=i+d;this.isInside(p,f)&&l.add(this.toCellId(p,f))}if(t.antiKing)for(var v=-1;v<=1;v++)for(var w=-1;w<=1;w++){var g=r+v,O=i+w;this.isInside(g,O)&&l.add(this.toCellId(g,O))}return l.delete(e),l}},{key:"getInvalidCellIds",value:function(e){for(var t=this,n=new Set,a=function(a){var r=t.cells[a].value;r&&t.getVisibleCells(a,e).forEach((function(e){r===t.cells[e].value&&(n.add(a),n.add(e))}))},r=0;r<81;r++)a(r);return n}},{key:"getPossibleValues",value:function(e,t){var n,a,r=this,i=Array.from(this.getVisibleCells(e,t)).map((function(e){return r.cells[e].value})).filter((function(e){return e}));return n=new Set(["1","2","3","4","5","6","7","8","9"]),a=new Set(i),new Set(Object(w.a)(n).filter((function(e){return!a.has(e)})))}},{key:"fillAllPossibleValues",value:function(e){var t=this;this.cells.forEach((function(n){n.value||(n.centerValues=t.getPossibleValues(n.id,e))}))}},{key:"hasSelected",value:function(){return void 0!==this.cells.find((function(e){return e.selected}))}},{key:"hasSandwichSelected",value:function(){return void 0!==this.rowSandwich.find((function(e){return e.selected}))||void 0!==this.colSandwich.find((function(e){return e.selected}))}},{key:"getSandwichSum",value:function(e){if(e.indexOf("1")<0||e.indexOf("9")<0)return null;var t,n=Math.min(e.indexOf("1"),e.indexOf("9")),a=Math.max(e.indexOf("1"),e.indexOf("9")),r=0,i=Object(y.a)(e.slice(n+1,a));try{for(i.s();!(t=i.n()).done;){var l=t.value;if(null===l)return null;r+=+l}}catch(o){i.e(o)}finally{i.f()}return r}},{key:"getRowValues",value:function(e){return this.cells.slice(9*e,9*e+9).map((function(e){return e.value}))}},{key:"getColValues",value:function(e){return this.cells.filter((function(t){return t.id%9===e})).map((function(e){return e.value}))}},{key:"getRowSandwichSum",value:function(e){return this.getSandwichSum(this.getRowValues(e))}},{key:"getColSandwichSum",value:function(e){return this.getSandwichSum(this.getColValues(e))}},{key:"setSelected",value:function(e){this.cells[e].selected=!0}},{key:"getSelectedValues",value:function(){return new Set(this.cells.filter((function(e){return e.selected})).filter((function(e){return e.value})).map((function(e){return e.value})))}},{key:"setRestricted",value:function(e){for(var t=this,n=null,a=0;a<81;a++)this.cells[a].selected&&(n=null===n?this.getVisibleCells(a,e):S(this.getVisibleCells(a,e),n));n&&n.forEach((function(e){t.cells[e].restricted=!0}))}},{key:"setErrors",value:function(e){var t=this;e.forEach((function(e){t.cells[e].error=!0}))}},{key:"setValueOfSingleCell",value:function(e,t,n,a){var r=this;this.cells[e].isFixed||(this.cells[e].value=t,a&&this.getVisibleCells(this.cells[e].id,n).forEach((function(e){r.cells[e].cornerValues.delete(t),r.cells[e].centerValues.delete(t)})))}},{key:"setValueOfSelectedCells",value:function(e,t){var n=this,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.cells.filter((function(e){return e.selected})).forEach((function(r){return n.setValueOfSingleCell(r.id,e,t,a)}))}},{key:"colorSelectedCells",value:function(e){this.cells.filter((function(e){return e.selected})).forEach((function(t){return t.color=e}))}},{key:"clearAllColors",value:function(){this.cells.forEach((function(e){return e.color=null}))}},{key:"unsetSelectedCells",value:function(){this.cells.filter((function(e){return e.selected&&!e.isFixed})).forEach((function(e){e.value=null})),[].concat(Object(w.a)(this.rowSandwich),Object(w.a)(this.colSandwich)).filter((function(e){return e.selected&&!e.isFixed})).forEach((function(e){e.value=null}))}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.cornerValues.has(e)?t.cornerValues.delete(e):t.cornerValues.add(e))}))}},{key:"clearCornerValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.cornerValues.clear()}))}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.centerValues.has(e)?t.centerValues.delete(e):t.centerValues.add(e))}))}},{key:"clearCenterValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.centerValues.clear()}))}},{key:"clearAllSelections",value:function(){this.cells.forEach((function(e){e.selected=!1})),this.rowSandwich.forEach((function(e){e.selected=!1})),this.colSandwich.forEach((function(e){e.selected=!1}))}},{key:"clearAllRestricteds",value:function(){this.cells.forEach((function(e){e.restricted=!1}))}},{key:"clearAllErrors",value:function(){this.cells.forEach((function(e){e.error=!1})),this.rowSandwich.forEach((function(e){e.error=!1})),this.colSandwich.forEach((function(e){e.error=!1}))}}]),e}(),j={type:"ACTION_NO_OP"},A=function(e){return e.id>=e.boards.length-1?j:{type:"ACTION_REDO",payload:{serialized:e.boards[e.id+1]}}},V=function(e){return 0===e.id?j:{type:"ACTION_UNDO",payload:{serialized:e.boards[e.id-1]}}},N=function(e){return{type:"ACTION_UPDATE_BOARD",payload:{board:e}}},x=function(e,t,n){var a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=b.a.cloneDeep(e);if(null!==r&&(i.multiSelectMode=r),a?(i.clearAllSelections(),i.clearAllRestricteds(),i.highlightMatching=null):i.clearAllRestricteds(),i.setSelected(n),t.displayOptions.highlightRestricted&&i.setRestricted(t.gameOptions),t.displayOptions.highlightMatchingNumbers){i.highlightMatching=null;var l=i.getSelectedValues();if(1===l.size){var o=l.values().next().value;i.highlightMatching=o}}return N(i)},D=function(e,t,n,a){var r=b.a.cloneDeep(e);if(!t.gameOptions.sandwich)throw new Error("Attempt to select sandwich in normal mode");return r.clearAllSelections(),r.clearAllRestricteds(),r.highlightMatching=null,n?r.rowSandwich[a].selected=!0:r.colSandwich[a].selected=!0,N(r)},T=function(e,t,n,a){for(var r=0,i=0,l=0;l<81;l++)if(e.cells[l].selected){var o=e.toRowCol(l),c=Object(m.a)(o,2);r=c[0],i=c[1];break}for(var s=0;s<9;s++){if(e.colSandwich[s].selected){r=-1,i=s;break}e.rowSandwich[s].selected&&(r=s,i=-1)}return t.gameOptions.sandwich?(i=(i+a+10)%10,9===(r=(r+n+10)%10)&&9===i?D(e,t,!1,0):9===r?D(e,t,!1,i):9===i?D(e,t,!0,r):x(e,t,e.toCellId(r,i))):(r=(r+n+9)%9,i=(i+a+9)%9,x(e,t,e.toCellId(r,i)))},M=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderCellMainValue",value:function(){if(this.props.cell.value)return r.a.createElement("span",{className:"cell-main-value"},this.props.cell.value)}},{key:"shouldHighlightMatching",value:function(e){return this.props.highlightMatching&&e===this.props.highlightMatching}},{key:"renderCellCornerValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.cornerValues).sort().map((function(t){var n=e.shouldHighlightMatching(t)?"matching":"";return r.a.createElement("span",{className:n,key:"corner-"+e.props.cell.id+"-"+t},t)}));return r.a.createElement("span",{className:"cell-corner-value"},t)}}},{key:"renderCellCenterValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.centerValues).sort().map((function(t){var n=e.shouldHighlightMatching(t)?"matching":"";return r.a.createElement("span",{className:n,key:"center-"+e.props.cell.id+"-"+t},t)}));return r.a.createElement("span",{className:"cell-center-value"},t)}}},{key:"render",value:function(){var e=["cell"];return this.props.cell.isRegionTop()&&e.push("region-top"),this.props.cell.isRegionLeft()&&e.push("region-left"),this.props.cell.isBoardLeft()&&e.push("board-left"),this.props.cell.isBoardRight()&&e.push("board-right"),this.props.cell.isBoardTop()&&e.push("board-top"),this.props.cell.isBoardBottom()&&e.push("board-bottom"),this.props.cell.selected?e.push("selected"):this.shouldHighlightMatching(this.props.cell.value)?e.push("matching"):this.props.cell.restricted?e.push("restricted"):this.props.cell.isFixed?e.push("fixed"):this.props.cell.error&&e.push("error"),null===this.props.cell.color||this.props.cell.error||e.push("color-".concat(this.props.cell.color)),r.a.createElement("div",{className:e.join(" "),onClick:this.props.onClick,onMouseDown:this.props.onMouseDown,onMouseOver:this.props.onMouseOver,key:this.props.cell.id},this.renderCellMainValue(),this.renderCellCornerValues(),this.renderCellCenterValues())}}]),n}(r.a.Component),R=n(90),_=n(30),I=n(29),U={0:[[]],2:[[2]],3:[[3]],4:[[4]],5:[[5],[2,3]],6:[[6],[2,4]],7:[[7],[2,5],[3,4]],8:[[8],[2,6],[3,5]],9:[[2,7],[3,6],[4,5],[2,3,4]],10:[[2,8],[3,7],[4,6],[2,3,5]],11:[[3,8],[4,7],[5,6],[2,3,6],[2,4,5]],12:[[4,8],[5,7],[2,3,7],[2,4,6],[3,4,5]],13:[[5,8],[6,7],[2,3,8],[2,4,7],[2,5,6],[3,4,6]],14:[[6,8],[2,4,8],[2,5,7],[3,4,7],[3,5,6],[2,3,4,5]],15:[[7,8],[2,5,8],[2,6,7],[3,4,8],[3,5,7],[4,5,6],[2,3,4,6]],16:[[2,6,8],[3,5,8],[3,6,7],[4,5,7],[2,3,4,7],[2,3,5,6]],17:[[2,7,8],[3,6,8],[4,5,8],[4,6,7],[2,3,4,8],[2,3,5,7],[2,4,5,6]],18:[[3,7,8],[4,6,8],[5,6,7],[2,3,5,8],[2,3,6,7],[2,4,5,7],[3,4,5,6]],19:[[4,7,8],[5,6,8],[2,3,6,8],[2,4,5,8],[2,4,6,7],[3,4,5,7]],20:[[5,7,8],[2,3,7,8],[2,4,6,8],[2,5,6,7],[3,4,5,8],[3,4,6,7],[2,3,4,5,6]],21:[[6,7,8],[2,4,7,8],[2,5,6,8],[3,4,6,8],[3,5,6,7],[2,3,4,5,7]],22:[[2,5,7,8],[3,4,7,8],[3,5,6,8],[4,5,6,7],[2,3,4,5,8],[2,3,4,6,7]],23:[[2,6,7,8],[3,5,7,8],[4,5,6,8],[2,3,4,6,8],[2,3,5,6,7]],24:[[3,6,7,8],[4,5,7,8],[2,3,4,7,8],[2,3,5,6,8],[2,4,5,6,7]],25:[[4,6,7,8],[2,3,5,7,8],[2,4,5,6,8],[3,4,5,6,7]],26:[[5,6,7,8],[2,3,6,7,8],[2,4,5,7,8],[3,4,5,6,8]],27:[[2,4,6,7,8],[3,4,5,7,8],[2,3,4,5,6,7]],28:[[2,5,6,7,8],[3,4,6,7,8],[2,3,4,5,6,8]],29:[[3,5,6,7,8],[2,3,4,5,7,8]],30:[[4,5,6,7,8],[2,3,4,6,7,8]],31:[[2,3,5,6,7,8]],32:[[2,4,5,6,7,8]],33:[[3,4,5,6,7,8]],35:[[2,3,4,5,6,7,8]]},F={0:[0],2:[1],3:[1],4:[1],5:[1,2],6:[1,2],7:[1,2],8:[1,2],9:[2,3],10:[2,3],11:[2,3],12:[2,3],13:[2,3],14:[2,3,4],15:[2,3,4],16:[3,4],17:[3,4],18:[3,4],19:[3,4],20:[3,4,5],21:[3,4,5],22:[4,5],23:[4,5],24:[4,5],25:[4,5],26:[4,5],27:[5,6],28:[5,6],29:[5,6],30:[5,6],31:[6],32:[6],33:[6],35:[7]},B=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderSandwichHint",value:function(){var e=this;if(this.props.sandwichHint&&null!==this.props.value.value&&0!==this.props.value.value){var t=U[this.props.value.value].map((function(t,n){return r.a.createElement("div",{key:"tooltip-sandwich-".concat(e.props.value.id,"-").concat(n)},t.join(" "))})),n=r.a.createElement(I.a,{id:"tooltip-sandwich-".concat(this.props.value.id)},r.a.createElement("div",null,t));return r.a.createElement("div",{className:"sandwich-corner-value"},r.a.createElement(_.a,{placement:"right",overlay:n},r.a.createElement(R.a,null)))}}},{key:"render",value:function(){var e=null===this.props.value.value?void 0:this.props.value.value,t=["sandwich-cell"];return this.props.value.selected?t.push("selected"):this.props.value.isFixed&&t.push("fixed"),this.props.value.error&&t.push("error"),r.a.createElement("div",{onClick:this.props.onClick,className:t.join(" ")},r.a.createElement("div",{className:"cell-main-value"},e),this.renderSandwichHint())}}]),n}(r.a.Component),P=Object(o.b)((function(e){return{sandwichHint:e.control.displayOptions.sandwichHint}}))(B),L=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderCell",value:function(e){var t=this;return r.a.createElement(M,{cell:this.props.board.cells[e],onClick:function(n){return t.props.onClick(n,e)},onMouseDown:function(n){return t.props.onMouseDown(n,e)},onMouseOver:function(){return t.props.onMouseOver(e)},key:String(e),highlightMatching:this.props.board.highlightMatching})}},{key:"renderSandwichCell",value:function(e,t,n){var a=this,i=e?this.props.board.rowSandwich[t]:this.props.board.colSandwich[t];return r.a.createElement(P,{value:i,key:n,onClick:function(n){return a.props.onSelectSandwich(n,e,t)}})}},{key:"renderEmptySandwichCell",value:function(){return r.a.createElement("div",{className:"sandwich-cell"})}},{key:"renderRow",value:function(e){var t=this,n=9*e,a=Object(w.a)(Array(9).keys()).map((function(e){return t.renderCell(n+e)})),i=null;return this.props.gameOptions.sandwich&&(i=this.renderSandwichCell(!0,e,"sandwich-row-".concat(e))),r.a.createElement("div",{className:"row",key:n},i,a)}},{key:"renderSandwichRow",value:function(){var e=this,t=Object(w.a)(Array(9).keys()).map((function(t){return e.renderSandwichCell(!1,t,"sandwich-col-".concat(t))}));return r.a.createElement("div",{className:"row"},this.renderEmptySandwichCell(),t)}},{key:"render",value:function(){var e=this,t=null;this.props.gameOptions.sandwich&&(t=this.renderSandwichRow());var n=Object(w.a)(Array(9).keys()).map((function(t){return e.renderRow(t)}));return r.a.createElement("div",null,t,n)}}]),n}(r.a.Component),K=n(23),G=n(21),H=n(56),z=n.n(H),J=function(e){return 16843009*((e=(858993459&(e-=e>>1&1431655765))+(e>>2&858993459))+(e>>4)&252645135)>>24},X=function(e,t){return(e>>t&1)>0},Y=function(e){return~~(e/9)},q=function(e){return e%9},Q=function(e,t){return 9*e+t},W=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Z=function(e,t){return e[0]!==t[0]?e[0]-t[0]:e[1]-t[1]},$=function(){function e(t){Object(d.a)(this,e),this.candidates=void 0,this.set=void 0,this.candidates=t.map((function(e){return e<=0?-1:e})),this.set=new z.a([],W,Z);for(var n=0;n<81;n++)t[n]>0&&this.set.add([J(t[n]),n])}return Object(p.a)(e,[{key:"hasCandidate",value:function(e,t){return!(this.candidates[e]<0)&&X(this.candidates[e],t)}},{key:"getCandidates",value:function(e){if(this.candidates[e]<0)return[];for(var t=[],n=1;n<=9;n++)this.hasCandidate(e,n)&&t.push(n);return t}},{key:"getBestCell",value:function(){var e=this.set.min();return e||[-1,-1]}},{key:"setCandidate",value:function(e,t){this.candidates[e]<0||(this.set.remove([J(this.candidates[e]),e]),this.candidates[e]=t,this.set.add([J(t),e]))}},{key:"addCandidate",value:function(e,t){this.candidates[e]<0||X(this.candidates[e],t)||this.setCandidate(e,this.candidates[e]+(1<<t))}},{key:"removeCandidate",value:function(e,t){this.candidates[e]<0||X(this.candidates[e],t)&&this.setCandidate(e,this.candidates[e]-(1<<t))}},{key:"removeCell",value:function(e){this.candidates[e]<0||(this.set.remove([J(this.candidates[e]),e]),this.candidates[e]=-1)}}]),e}(),ee=function(e,t){if(0===e)return[new Set,new Set([1,2,3,4,5,6,7,8,9])];var n=t.indexOf(1),a=t.indexOf(9);if(n>a){var r=[a,n];n=r[0],a=r[1]}var i,l=a-n-1,o=new Set,c=new Set,s=!1,u=Object(y.a)(t);try{for(u.s();!(i=u.n()).done;){var h=i.value;0!==h&&(1===h||9===h?s=!s:s?o.add(h):c.add(h))}}catch(A){u.e(A)}finally{u.f()}var d,p=new Set,f=new Set,v=Object(y.a)(U[e]);try{for(v.s();!(d=v.n()).done;){var m=d.value,w=new Set(m),g=!0;m.length!==l&&(g=!1);var O,b=Object(y.a)(o);try{for(b.s();!(O=b.n()).done;){var S=O.value;if(!w.has(S)){g=!1;break}}}catch(A){b.e(A)}finally{b.f()}var C,k=Object(y.a)(c);try{for(k.s();!(C=k.n()).done;){var E=C.value;if(w.has(E)){g=!1;break}}}catch(A){k.e(A)}finally{k.f()}if(g)for(var j=1;j<=9;j++)w.has(j)?p.add(j):f.add(j)}}catch(A){v.e(A)}finally{v.f()}return[p,f]},te=function(e,t,n,a,r){if(null!==e.rowSandwich[t].value){var i=function(e,t){return t.slice(9*e,9*e+9)}(t,a),l=e.rowSandwich[t].value;if(i.indexOf(1)>=0&&i.indexOf(9)>=0){for(var o=ee(l,i),c=Object(m.a)(o,2),s=c[0],u=c[1],h=!1,d=0;d<9;d++)if(1===i[d]||9===i[d])h=!h;else if(0===i[d])for(var p=1;p<=9;p++){var f=Q(t,d);(h&&!s.has(p)||!h&&!u.has(p))&&r.removeCandidate(f,p)}}else if(i.indexOf(1)>=0||i.indexOf(9)>=0){var v=i.indexOf(1);v<0&&(v=i.indexOf(9));for(var w=new Set(F[l]),g=0;g<9;g++)if(0===i[g]&&!w.has(Math.abs(g-v)-1)){var O=Q(t,g);r.removeCandidate(O,1),r.removeCandidate(O,9)}}}if(null!==e.colSandwich[n].value){var b=function(e,t){for(var n=[],a=e;a<81;a+=9)n.push(t[a]);return n}(n,a),y=e.colSandwich[n].value;if(b.indexOf(1)>=0&&b.indexOf(9)>=0){for(var S=ee(y,b),C=Object(m.a)(S,2),k=C[0],E=C[1],j=!1,A=0;A<9;A++)if(1===b[A]||9===b[A])j=!j;else if(0===b[A])for(var V=1;V<=9;V++){var N=Q(A,n);(j&&!k.has(V)||!j&&!E.has(V))&&r.removeCandidate(N,V)}}else if(b.indexOf(1)>=0||b.indexOf(9)>=0){var x=b.indexOf(1);x<0&&(x=b.indexOf(9));for(var D=new Set(F[y]),T=0;T<9;T++)if(0===b[T]&&!D.has(Math.abs(T-x)-1)){var M=Q(T,n);r.removeCandidate(M,1),r.removeCandidate(M,9)}}}},ne=function e(t,n,a,r){var i=r.getBestCell(),l=Object(m.a)(i,2),o=l[0],c=l[1];if(0===o)return[null,0];if(o<0){for(var s=b.a.cloneDeep(t),u=0;u<81;u++){if(0===a[u])throw new Error("Invalid state: cannot find a value for cell ID ".concat(u));s.setValueOfSingleCell(u,String.fromCharCode(48+a[u]),n.gameOptions,!1)}return[s,1]}var h,d=null,p=0,f=r.getCandidates(c),v=Object(y.a)(f);try{for(v.s();!(h=v.n()).done;){var w=h.value,g=b.a.clone(a),O=b.a.clone(r.candidates);a[c]=w,r.removeCell(c);var S,C=t.getVisibleCells(c,n.gameOptions),k=Object(y.a)(C);try{for(k.s();!(S=k.n()).done;){var E=S.value;r.removeCandidate(E,w)}}catch(x){k.e(x)}finally{k.f()}n.gameOptions.sandwich&&te(t,Y(c),q(c),a,r);var j=e(t,n,a,r),A=Object(m.a)(j,2),V=A[0],N=A[1];if(N>0&&(null===d&&(d=V),(p+=N)>=2))break;a=g,r=new $(O)}}catch(x){v.e(x)}finally{v.f()}return[d,p]},ae=function(e,t){var n=b.a.cloneDeep(e);n.fillAllPossibleValues(t.gameOptions);var a=n.cells.map((function(e){return e.value?+e.value:0})),r=n.cells.map((function(e){if(null!==e.value)return 0;var t,n=0,a=Object(y.a)(e.centerValues);try{for(a.s();!(t=a.n()).done;){var r=t.value;null!==r&&(n+=1<<+r)}}catch(i){a.e(i)}finally{a.f()}return n}));if(t.gameOptions.sandwich){for(var i=0;i<9;i++){if(!n.rowSandwich[i].isValid())return[null,0];if(!n.colSandwich[i].isValid())return[null,0]}for(var l=new $(r),o=0;o<81;o++)a[o]>0&&te(n,Y(o),q(o),a,l);return function e(t,n,a,r){for(var i=1e3,l=!1,o=-1,c=1,s=0;s<9;s++){if(null!==t.rowSandwich[s].value){for(var u=0,h=0,d=0;d<9;d++){var p=Q(s,d);0===a[p]&&(r.hasCandidate(p,1)&&(u+=1),r.hasCandidate(p,9)&&(h+=1))}u>0&&u<i&&(i=u,l=!0,o=s,c=1),h>0&&h<i&&(i=h,l=!0,o=s,c=9)}if(null!==t.colSandwich[s].value){for(var f=0,v=0,w=0;w<9;w++){var g=Q(w,s);0===a[g]&&(r.hasCandidate(g,1)&&(f+=1),r.hasCandidate(g,9)&&(v+=1))}f>0&&f<i&&(i=f,l=!1,o=s,c=1),v>0&&v<i&&(i=v,l=!1,o=s,c=9)}}if(o<0)return ne(t,n,a,r);if(0===r.getBestCell()[0])return[null,0];for(var O=null,S=0,C=0;C<9;C++){var k=l?Q(o,C):Q(C,o);if(0===a[k]&&r.hasCandidate(k,c)){var E=b.a.clone(a),j=b.a.clone(r.candidates);a[k]=c,r.removeCell(k);var A,V=t.getVisibleCells(k,n.gameOptions),N=Object(y.a)(V);try{for(N.s();!(A=N.n()).done;){var x=A.value;r.removeCandidate(x,c)}}catch(_){N.e(_)}finally{N.f()}n.gameOptions.sandwich&&te(t,Y(k),q(k),a,r);var D=e(t,n,a,r),T=Object(m.a)(D,2),M=T[0],R=T[1];if(R>0&&(null===O&&(O=M),(S+=R)>=2))break;a=E,r=new $(j)}}return[O,S]}(n,t,a,l)}return ne(n,t,a,new $(r))},re=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderSandwichDisplayOptions",value:function(){var e=this;return this.props.sandwich?r.a.createElement(G.a.Check,{type:"checkbox",id:"checkbox-sandwich-hint",label:"Show Sandwich sum hints",checked:this.props.sandwichHint,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{sandwichHint:!e.props.sandwichHint}))}}):null}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"display-options"},r.a.createElement("h4",null,"Display Options"),r.a.createElement(G.a.Check,{type:"checkbox",id:"checkbox-highlight-restricted",label:"Highlight restricted cells",checked:this.props.highlightRestricted,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{highlightRestricted:!e.props.highlightRestricted}))}}),r.a.createElement(G.a.Check,{type:"checkbox",id:"checkbox-highlight-matching-numbers",label:"Highlight matching numbers",checked:this.props.highlightMatchingNumbers,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{highlightMatchingNumbers:!e.props.highlightMatchingNumbers}))}}),r.a.createElement(G.a.Check,{type:"checkbox",id:"checkbox-auto-cleanup",label:"Auto Cleanup corner & center values",checked:this.props.autoCleanUp,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{autoCleanUp:!e.props.autoCleanUp}))}}),this.renderSandwichDisplayOptions())}}]),n}(r.a.Component),ie=Object(o.b)((function(e){return Object(h.a)(Object(h.a)({},e.control.displayOptions),e.control.gameOptions)}),{updateDisplay:function(e){return{type:"ACTION_UPDATE_DISPLAY",payload:e}}})(re),le=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderLabel",value:function(e,t,n){return r.a.createElement(_.a,{placement:"right",overlay:r.a.createElement(I.a,{id:t},n)},r.a.createElement("span",null,e,"\xa0",r.a.createElement(R.a,null)))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"game-play"},r.a.createElement("h4",null,"Game Play"),r.a.createElement(G.a.Check,{type:"checkbox",id:"checkbox-anti-knight",label:this.renderLabel("Anti Knight","tooltip-anti-knight","Two cells which are knight's move away from each other cannot contain the same digit."),checked:this.props.antiKnight,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{antiKnight:!e.props.antiKnight}))}}),r.a.createElement(G.a.Check,{type:"checkbox",id:"checkbox-anti-king",label:this.renderLabel("Anti King","tooltip-anti-king","Two cells which are king's move away from each other cannot contain the same digit."),checked:this.props.antiKing,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{antiKing:!e.props.antiKing}))}}),r.a.createElement(G.a.Check,{type:"checkbox",id:"checkbox-sandwich",label:this.renderLabel("Sandwich","tooltip-sandwich","The numbers in each row / column specify the sum between the number 1 and 9 in that row / column."),checked:this.props.sandwich,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{sandwich:!e.props.sandwich}))}}))}}]),n}(r.a.Component),oe=Object(o.b)((function(e){return Object(h.a)({},e.control.gameOptions)}),{updateGameOptions:function(e){return{type:"ACTION_UPDATE_GAME_PLAY",payload:e}}})(le),ce=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderUrl",value:function(){if(this.props.url)return r.a.createElement("a",{href:this.props.url},"Link")}},{key:"renderTooltip",value:function(e,t){return r.a.createElement(I.a,{id:e},t)}},{key:"render",value:function(){var e=this;return r.a.createElement(G.a,null,r.a.createElement("div",{className:""},r.a.createElement(K.a,{onClick:function(){return e.props.verify(e.props.board,e.props.control)}},"Verify"),"\xa0",r.a.createElement(K.a,{onClick:function(){return e.props.undo(e.props.history)},className:"btn-secondary"},"Undo"),"\xa0",r.a.createElement(K.a,{onClick:function(){return e.props.redo(e.props.history)},className:"btn-secondary"},"Redo")),r.a.createElement("hr",null),r.a.createElement(ie,null),r.a.createElement("hr",null),r.a.createElement(oe,null),r.a.createElement("hr",null),r.a.createElement("h4",null,"Help"),r.a.createElement(_.a,{placement:"top",overlay:this.renderTooltip("tooltip-fill-center","Show all possible values for each cell.")},r.a.createElement(K.a,{onClick:function(){return e.props.fillCenter(e.props.board,e.props.control)},className:"btn-secondary"},"Fill all center values")),"\xa0",r.a.createElement(K.a,{onClick:function(){return e.props.solve(e.props.board,e.props.control)},className:"btn-secondary"},"Solve"),r.a.createElement("hr",null),r.a.createElement(K.a,{onClick:function(){return e.props.generateUrl(e.props.board,e.props.control)},className:"btn-secondary"},"Get URL"),"\xa0",this.renderUrl())}}]),n}(r.a.Component),se=Object(o.b)((function(e){return{url:e.gameUrl,history:e.history,board:e.board,control:e.control}}),{undo:V,redo:A,fillCenter:function(e,t){var n=b.a.cloneDeep(e);return n.fillAllPossibleValues(t.gameOptions),N(n)},generateUrl:function(e,t){var n={values:e.cells.map((function(e){return e.value?e.value:"0"})).join(""),rowSandwichSums:t.gameOptions.sandwich?e.rowSandwich.map((function(e){return e.value})):null,colSandwichSums:t.gameOptions.sandwich?e.colSandwich.map((function(e){return e.value})):null,gameOptions:t.gameOptions};return{type:"ACTION_GENERATE_URL",payload:{url:window.location.origin+window.location.pathname+"#/"+window.btoa(JSON.stringify(n))}}},solve:function(e,t){var n=ae(e,t),a=Object(m.a)(n,2),r=a[0],i=a[1];return i>=2?alert("Found at least "+i+" solutions."):alert("Found "+i+" solution."),null!==r?N(r):j},verify:function(e,t){var n=b.a.cloneDeep(e);n.clearAllSelections(),n.clearAllRestricteds(),n.clearAllErrors();var a=n.getInvalidCellIds(t.gameOptions);n.setErrors(a);for(var r=a.size>0,i=0;i<9;i++){if(n.rowSandwich[i].isValid()){var l=n.rowSandwich[i].value,o=n.getRowSandwichSum(i);null!==l&&null!==o&&l!==o&&(r=!0,n.rowSandwich[i].error=!0)}else r=!0,n.rowSandwich[i].error=!0;if(n.colSandwich[i].isValid()){var c=n.colSandwich[i].value,s=n.getColSandwichSum(i);null!==c&&null!==s&&c!==s&&(r=!0,n.colSandwich[i].error=!0)}else r=!0,n.colSandwich[i].error=!0}return alert(r?"Error found :(":"Looks good to me!"),N(n)}})(ce),ue=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"renderColor",value:function(e){var t=this,n=["palette-cell","color-".concat(e)];return r.a.createElement("div",{className:n.join(" "),key:"palette-".concat(e),onClick:function(){return t.props.color(t.props.board,e)}})}},{key:"render",value:function(){var e=this,t=Object(w.a)(Array(4).keys()).map((function(t){return e.renderColor(t)}));return r.a.createElement("div",{className:"row palette"},t,r.a.createElement(K.a,{className:"btn-secondary",onClick:function(){return e.props.clearAllColors(e.props.board)}},"Clear All Colors"))}}]),n}(r.a.Component),he=Object(o.b)((function(e){return{board:e.board}}),{clearAllColors:function(e){var t=b.a.cloneDeep(e);return t.clearAllColors(),N(t)},color:function(e,t){var n=b.a.cloneDeep(e);return n.colorSelectedCells(t),N(n)}})(ue),de=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"componentDidMount",value:function(){this.props.encoded&&this.props.initGameState(JSON.parse(window.atob(this.props.encoded)))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{onKeyDown:function(t){return e.props.keyDown(e.props.board,e.props.control,e.props.history,t)},tabIndex:0,className:"container",onMouseUp:function(){return e.props.mouseUp(e.props.board)}},r.a.createElement("h1",null,r.a.createElement("a",{href:"/sudoku"},"Sudoku Tool")),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm"},r.a.createElement(L,{board:this.props.board,gameOptions:this.props.control.gameOptions,onClick:function(t,n){return e.props.select(e.props.board,e.props.control,n,!t.metaKey)},onSelectSandwich:function(t,n,a){return e.props.selectSandwich(e.props.board,e.props.control,n,a)},onMouseDown:function(t,n){return e.props.mouseDown(e.props.board,e.props.control,n,!t.metaKey)},onMouseOver:function(t){return e.props.mouseOver(e.props.board,e.props.control,t)}}),r.a.createElement(he,null)),r.a.createElement("div",{className:"col-sm"},r.a.createElement(se,null))))}}]),n}(r.a.Component),pe=Object(o.b)((function(e,t){return Object(h.a)(Object(h.a)({},e),{},{encoded:t.match.params.encoded})}),{initGameState:function(e){for(var t=new E,n=0;n<81;n++){"0"!==e.values[n]&&(t.cells[n].value=e.values[n],t.cells[n].isFixed=!0)}if(e.rowSandwichSums)for(var a=0;a<9;a++)t.rowSandwich[a].value=e.rowSandwichSums[a],t.rowSandwich[a].isFixed=!0;if(e.colSandwichSums)for(var r=0;r<9;r++)t.colSandwich[r].value=e.colSandwichSums[r],t.colSandwich[r].isFixed=!0;return{type:"ACTION_INIT_GAME_STATE",payload:{board:t,gameOptions:e.gameOptions}}},keyDown:function(e,t,n,a){var r=!!a.shiftKey,i=!!a.metaKey;if(a.keyCode>=g.a&&a.keyCode<=g.b){if(a.keyCode!==g.a&&e.hasSelected()){var l=String.fromCharCode(a.keyCode);return r?function(e,t){var n=b.a.cloneDeep(e);return n.toggleCornerValuesOfSelectedCells(t),N(n)}(e,l):i?(a.preventDefault(),function(e,t){var n=b.a.cloneDeep(e);return n.toggleCenterValuesOfSelectedCells(t),N(n)}(e,l)):function(e,t,n){var a=b.a.cloneDeep(e);if(a.clearAllErrors(),a.setValueOfSelectedCells(n,t.gameOptions,t.displayOptions.autoCleanUp),t.displayOptions.highlightMatchingNumbers){a.highlightMatching=null;var r=a.getSelectedValues();if(1===r.size){var i=r.values().next().value;a.highlightMatching=i}}return N(a)}(e,t,l)}return e.hasSandwichSelected()?function(e,t){var n=b.a.cloneDeep(e);return n.clearAllErrors(),[].concat(Object(w.a)(n.rowSandwich),Object(w.a)(n.colSandwich)).filter((function(e){return e.selected&&!e.isFixed})).forEach((function(e){null===e.value?e.value=t:e.value<10&&(e.value=10*e.value+t)})),N(n)}(e,+String.fromCharCode(a.keyCode)):j}switch(a.keyCode){case g.i:return function(e){var t=b.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),N(t)}(e);case g.c:return a.preventDefault(),function(e){var t=b.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),t.clearCornerValuesOfSelectedCells(),t.clearCenterValuesOfSelectedCells(),N(t)}(e);case g.d:return T(e,t,1,0);case g.k:return T(e,t,-1,0);case g.f:return T(e,t,0,-1);case g.h:return T(e,t,0,1);case g.e:return function(e){var t=b.a.cloneDeep(e);return t.clearAllSelections(),t.clearAllRestricteds(),t.highlightMatching=null,N(t)}(e);case g.m:case g.j:return V(n);case g.l:case g.g:return A(n)}return j},mouseDown:function(e,t,n,a){return x(e,t,n,a,!0)},mouseOver:function(e,t,n){return e.multiSelectMode?x(e,t,n,!1):j},mouseUp:function(e){return N(Object.assign(e,{multiSelectMode:!1}))},select:x,selectSandwich:D})(de),fe=(n(79),function e(){Object(d.a)(this,e),this.displayOptions=void 0,this.gameOptions=void 0,this.displayOptions={highlightRestricted:!0,highlightMatchingNumbers:!1,autoCleanUp:!1,sandwichHint:!1},this.gameOptions={antiKnight:!1,antiKing:!1,sandwich:!1}}),ve=n(43),me=n.n(ve),we=function e(){Object(d.a)(this,e),this.boards=void 0,this.id=void 0,this.boards=[],this.id=0;var t=new E;this.boards.push(t.serialize())},ge=Object(u.b)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new E,t=arguments.length>1?arguments[1]:void 0;if("ACTION_UPDATE_BOARD"===t.type)return t.payload.board;if("ACTION_UNDO"===t.type){var n=new E;return n.load(t.payload.serialized),n}if("ACTION_REDO"===t.type){var a=new E;return a.load(t.payload.serialized),a}return"ACTION_INIT_GAME_STATE"===t.type?t.payload.board:e},control:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new fe,t=arguments.length>1?arguments[1]:void 0;return"ACTION_UPDATE_DISPLAY"===t.type?Object(h.a)(Object(h.a)({},e),{},{displayOptions:t.payload}):"ACTION_UPDATE_GAME_PLAY"===t.type?Object(h.a)(Object(h.a)({},e),{},{gameOptions:t.payload}):"ACTION_INIT_GAME_STATE"===t.type?Object(h.a)(Object(h.a)({},e),{},{gameOptions:t.payload.gameOptions}):e},history:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new we,t=arguments.length>1?arguments[1]:void 0;if("ACTION_INIT_GAME_STATE"===t.type)return{boards:[t.payload.board.serialize()],id:0};if("ACTION_UPDATE_BOARD"===t.type){var n=t.payload.board.serialize();return n!==e.boards[e.id]&&(e.boards=e.boards.slice(0,e.id+1),e.boards.push(n),e.id+=1),e}return"ACTION_UNDO"===t.type?(me()(e.id>0),Object(h.a)(Object(h.a)({},e),{},{id:e.id-1})):"ACTION_REDO"===t.type?(me()(e.id+1<e.boards.length),Object(h.a)(Object(h.a)({},e),{},{id:e.id+1})):e},isMouseDown:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e},highlightMatching:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return e},gameUrl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"ACTION_GENERATE_URL"===t.type?t.payload.url:e}}),Oe=Object(u.c)(ge,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());l.a.render(r.a.createElement(o.a,{store:Oe},r.a.createElement(c.a,null,r.a.createElement(s.a,{path:"/:encoded?",component:pe}))),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.09434f8f.chunk.js.map
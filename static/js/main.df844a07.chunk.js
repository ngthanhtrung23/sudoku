(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{41:function(e,t,n){e.exports=n(59)},53:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);n(42);var r=n(0),l=n.n(r),a=n(27),i=n.n(a),o=n(16),s=n(40),c=n(6),u=n(21),h=n(4),p=n(7),d=n(8),f=n(14),v=n(13),g=n(18),O=n(10),b=n(9),y=n.n(b),m={type:"ACTION_NO_OP"},C=function(e){return e.id>=e.boards.length-1?m:{type:"ACTION_REDO",payload:{serialized:e.boards[e.id+1]}}},k=function(e){return 0===e.id?m:{type:"ACTION_UNDO",payload:{serialized:e.boards[e.id-1]}}},E=function(e){return{type:"ACTION_UPDATE_BOARD",payload:{board:e}}},j=function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,a=y.a.cloneDeep(e);if(null!==l&&(a.multiSelectMode=l),r?(a.clearAllSelections(),a.clearAllRestricteds(),a.highlightMatching=null):a.clearAllRestricteds(),a.setSelected(n),t.displayOptions.highlightRestricted&&a.setRestricted(t.gameOptions),t.displayOptions.highlightMatchingNumbers){a.highlightMatching=null;var i=a.getSelectedValues();if(1===i.size){var o=i.values().next().value;a.highlightMatching=o}}return E(a)},A=function(e,t,n,r){for(var l=0,a=0,i=0;i<81;i++)if(e.cells[i].selected){var o=e.toRowCol(i),s=Object(g.a)(o,2);l=s[0],a=s[1];break}return l=(l+n+9)%9,a=(a+r+9)%9,j(e,t,e.toCellId(l,a))},V=n(32),S=function(e){return 16843009*((e=(858993459&(e-=e>>1&1431655765))+(e>>2&858993459))+(e>>4)&252645135)>>24},w=function(e,t){return(e>>t&1)>0},N=function(e,t){var n=y.a.cloneDeep(e);n.fillAllPossibleValues(t.gameOptions);var r=n.cells.map((function(e){return e.value?+e.value:0})),l=n.cells.map((function(e){var t,n=0,r=Object(V.a)(e.centerValues);try{for(r.s();!(t=r.n()).done;){var l=t.value;null!==l&&(n+=1<<+l)}}catch(a){r.e(a)}finally{r.f()}return n}));return function e(t,n,r,l){for(var a=-1,i=0;i<81;i++)0===r[i]&&(a<0||S(r[i])<S(r[a]))&&(a=i);if(a<0){for(var o=y.a.cloneDeep(t),s=0;s<81;s++)o.setValueOfSingleCell(s,String.fromCharCode(48+r[s]),n.gameOptions,!1);return[o,1]}if(0===S(l[a]))return[null,0];for(var c,u,h=null,p=0,d=1;d<=9;d++)if(w(l[a],d)){var f=y.a.clone(r),v=y.a.clone(l);r[a]=d;var O,b=t.getVisibleCells(a,n.gameOptions),m=Object(V.a)(b);try{for(m.s();!(O=m.n()).done;){var C=O.value;l[C]=(c=l[C],w(c,u=d)?c-(1<<u):c)}}catch(N){m.e(N)}finally{m.f()}var k=e(t,n,r,l),E=Object(g.a)(k,2),j=E[0],A=E[1];if(A>0&&(null===h&&(h=j),(p+=A)>=2))break;r=f,l=v}return[h,p]}(n,t,r,l)},D=n(23),M=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"renderCellMainValue",value:function(){if(this.props.cell.value)return l.a.createElement("span",{className:"cell-main-value"},this.props.cell.value)}},{key:"shouldHighlightMatching",value:function(e){return this.props.highlightMatching&&e===this.props.highlightMatching}},{key:"renderCellCornerValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.cornerValues).sort().map((function(t){var n=e.shouldHighlightMatching(t)?"matching":"";return l.a.createElement("span",{className:n,key:"corner-"+e.props.cell.id+"-"+t},t)}));return l.a.createElement("span",{className:"cell-corner-value"},t)}}},{key:"renderCellCenterValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.centerValues).sort().map((function(t){var n=e.shouldHighlightMatching(t)?"matching":"";return l.a.createElement("span",{className:n,key:"center-"+e.props.cell.id+"-"+t},t)}));return l.a.createElement("span",{className:"cell-center-value"},t)}}},{key:"render",value:function(){var e=["cell"];return this.props.cell.isRegionTop()&&e.push("region-top"),this.props.cell.isRegionLeft()&&e.push("region-left"),this.props.cell.isBoardLeft()&&e.push("board-left"),this.props.cell.isBoardRight()&&e.push("board-right"),this.props.cell.isBoardTop()&&e.push("board-top"),this.props.cell.isBoardBottom()&&e.push("board-bottom"),this.props.cell.selected?e.push("selected"):this.shouldHighlightMatching(this.props.cell.value)?e.push("matching"):this.props.cell.restricted&&e.push("restricted"),this.props.cell.error&&e.push("error"),l.a.createElement("div",{className:e.join(" "),onClick:this.props.onClick,onMouseDown:this.props.onMouseDown,onMouseOver:this.props.onMouseOver,key:this.props.cell.id},this.renderCellMainValue(),this.renderCellCornerValues(),this.renderCellCenterValues())}}]),n}(l.a.Component),_=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"renderCell",value:function(e){var t=this;return l.a.createElement(M,{cell:this.props.board.cells[e],onClick:function(n){return t.props.onClick(n,e)},onMouseDown:function(n){return t.props.onMouseDown(n,e)},onMouseOver:function(){return t.props.onMouseOver(e)},key:String(e),highlightMatching:this.props.board.highlightMatching})}},{key:"renderRow",value:function(e){var t=this,n=Object(D.a)(Array(9).keys()).map((function(n){return t.renderCell(e+n)}));return l.a.createElement("div",{className:"row",key:e},n)}},{key:"render",value:function(){var e=this,t=Object(D.a)(Array(9).keys()).map((function(t){return e.renderRow(9*t)}));return l.a.createElement("div",null,t)}}]),n}(l.a.Component),R=n(20),T=n(19),I=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"display-options"},l.a.createElement("h4",null,"Display Options"),l.a.createElement(T.a.Check,{type:"checkbox",id:"checkbox-highlight-restricted",label:"Highlight restricted cells",checked:this.props.highlightRestricted,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{highlightRestricted:!e.props.highlightRestricted}))}}),l.a.createElement(T.a.Check,{type:"checkbox",id:"checkbox-highlight-matching-numbers",label:"Highlight matching numbers",checked:this.props.highlightMatchingNumbers,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{highlightMatchingNumbers:!e.props.highlightMatchingNumbers}))}}),l.a.createElement(T.a.Check,{type:"checkbox",id:"checkbox-auto-cleanup",label:"Auto Cleanup corner & center values",checked:this.props.autoCleanUp,onChange:function(){return e.props.updateDisplay(Object(h.a)(Object(h.a)({},e.props),{},{autoCleanUp:!e.props.autoCleanUp}))}}))}}]),n}(l.a.Component),U=Object(o.b)((function(e){return Object(h.a)({},e.control.displayOptions)}),{updateDisplay:function(e){return{type:"ACTION_UPDATE_DISPLAY",payload:e}}})(I),P=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"game-play"},l.a.createElement("h4",null,"Game Play"),l.a.createElement(T.a.Check,{type:"checkbox",id:"checkbox-anti-knight",label:"Anti Knight",checked:this.props.antiKnight,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{antiKnight:!e.props.antiKnight}))}}),l.a.createElement(T.a.Check,{type:"checkbox",id:"checkbox-anti-king",label:"Anti King",checked:this.props.antiKing,onChange:function(){return e.props.updateGameOptions(Object(h.a)(Object(h.a)({},e.props),{},{antiKing:!e.props.antiKing}))}}))}}]),n}(l.a.Component),B=Object(o.b)((function(e){return Object(h.a)({},e.control.gameOptions)}),{updateGameOptions:function(e){return{type:"ACTION_UPDATE_GAME_PLAY",payload:e}}})(P),K=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"renderUrl",value:function(){if(this.props.url)return l.a.createElement("a",{href:this.props.url},"Link")}},{key:"render",value:function(){return l.a.createElement(T.a,null,l.a.createElement("div",{className:""},l.a.createElement(R.a,{onClick:this.props.onClickVerify},"Verify"),"\xa0",l.a.createElement(R.a,{onClick:this.props.onClickUndo,className:"btn-secondary"},"Undo"),"\xa0",l.a.createElement(R.a,{onClick:this.props.onClickRedo,className:"btn-secondary"},"Redo")),l.a.createElement("hr",null),l.a.createElement(U,null),l.a.createElement("hr",null),l.a.createElement(B,null),l.a.createElement("hr",null),l.a.createElement("h4",null,"Help"),l.a.createElement(R.a,{onClick:this.props.onClickFillCenters,className:"btn-secondary"},"Fill all center values"),"\xa0",l.a.createElement(R.a,{onClick:this.props.solve,className:"btn-secondary"},"Solve"),l.a.createElement("hr",null),l.a.createElement(R.a,{onClick:this.props.generateUrl,className:"btn-secondary"},"Get URL"),"\xa0",this.renderUrl())}}]),n}(l.a.Component),G=Object(o.b)((function(e){return{url:e.gameUrl}}))(K),L=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.props.encoded&&this.props.initGameState(JSON.parse(window.atob(this.props.encoded)))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{onKeyDown:function(t){return e.props.keyDown(e.props.board,e.props.control,e.props.history,t)},tabIndex:0,className:"container",onMouseUp:function(){return e.props.mouseUp(e.props.board)}},l.a.createElement("h1",null,"Sudoku Tool"),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-sm"},l.a.createElement(_,{board:this.props.board,onClick:function(t,n){return e.props.select(e.props.board,e.props.control,n,!t.metaKey)},onMouseDown:function(t,n){return e.props.mouseDown(e.props.board,e.props.control,n,!t.metaKey)},onMouseOver:function(t){return e.props.mouseOver(e.props.board,e.props.control,t)}})),l.a.createElement("div",{className:"col-sm"},l.a.createElement(G,{onClickVerify:function(){return e.props.verify(e.props.board,e.props.control)},onClickUndo:function(){return e.props.undo(e.props.history)},onClickRedo:function(){return e.props.redo(e.props.history)},onClickFillCenters:function(){return e.props.fillCenter(e.props.board,e.props.control)},solve:function(){return e.props.solve(e.props.board,e.props.control)},generateUrl:function(){return e.props.generateUrl(e.props.board,e.props.control)}}))))}}]),n}(l.a.Component),x=Object(o.b)((function(e,t){return Object(h.a)(Object(h.a)({},e),{},{encoded:t.match.params.encoded})}),{redo:C,undo:k,initGameState:function(e){return{type:"ACTION_INIT_GAME_STATE",payload:{values:e.values,gameOptions:e.gameOptions}}},generateUrl:function(e,t){var n={values:e.cells.map((function(e){return e.value?e.value:"0"})).join(""),gameOptions:t.gameOptions};return{type:"ACTION_GENERATE_URL",payload:{url:window.location.origin+window.location.pathname+"#/"+window.btoa(JSON.stringify(n))}}},keyDown:function(e,t,n,r){var l=!!r.shiftKey,a=!!r.metaKey;if(r.keyCode>=O.a&&r.keyCode<=O.b){var i=String.fromCharCode(r.keyCode);return l?function(e,t){var n=y.a.cloneDeep(e);return n.toggleCornerValuesOfSelectedCells(t),E(n)}(e,i):a?(r.preventDefault(),function(e,t){var n=y.a.cloneDeep(e);return n.toggleCenterValuesOfSelectedCells(t),E(n)}(e,i)):function(e,t,n){var r=y.a.cloneDeep(e);if(r.clearAllErrors(),r.setValueOfSelectedCells(n,t.gameOptions,t.displayOptions.autoCleanUp),t.displayOptions.highlightMatchingNumbers){r.highlightMatching=null;var l=r.getSelectedValues();if(1===l.size){var a=l.values().next().value;r.highlightMatching=a}}return E(r)}(e,t,i)}switch(r.keyCode){case O.i:return function(e){var t=y.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),E(t)}(e);case O.c:return r.preventDefault(),function(e){var t=y.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),t.clearCornerValuesOfSelectedCells(),t.clearCenterValuesOfSelectedCells(),E(t)}(e);case O.d:return A(e,t,1,0);case O.k:return A(e,t,-1,0);case O.f:return A(e,t,0,-1);case O.h:return A(e,t,0,1);case O.e:return function(e){var t=y.a.cloneDeep(e);return t.clearAllSelections(),t.clearAllRestricteds(),t.highlightMatching=null,E(t)}(e);case O.m:case O.j:return k(n);case O.l:case O.g:return C(n)}return m},mouseDown:function(e,t,n,r){return j(e,t,n,r,!0)},mouseOver:function(e,t,n){return e.multiSelectMode?j(e,t,n,!1):m},mouseUp:function(e){return E(Object.assign(e,{multiSelectMode:!1}))},select:j,fillCenter:function(e,t){var n=y.a.cloneDeep(e);return n.fillAllPossibleValues(t.gameOptions),E(n)},verify:function(e,t){var n=y.a.cloneDeep(e);n.clearAllErrors();var r=n.getInvalidCellIds(t.gameOptions);return n.setErrors(r),alert(r.size>0?"Error found :(":"LGTM!"),E(n)},solve:function(e,t){var n=N(e,t),r=Object(g.a)(n,2),l=r[0],a=r[1];return a>=2?alert("Found at least "+a+" solutions."):alert("Found "+a+" solution."),null!==l?E(l):m}})(L),z=(n(53),function(){function e(t){Object(p.a)(this,e),this.value=void 0,this.cornerValues=void 0,this.centerValues=void 0,this.selected=void 0,this.restricted=void 0,this.error=void 0,this.row=void 0,this.col=void 0,this.id=void 0,this.value=null,this.cornerValues=new Set,this.centerValues=new Set,this.selected=!1,this.restricted=!1,this.error=!1,this.row=~~(t/9),this.col=t%9,this.id=t}return Object(d.a)(e,[{key:"isRegionTop",value:function(){return this.row%3===0}},{key:"isRegionBottom",value:function(){return this.row%3===2}},{key:"isRegionLeft",value:function(){return this.col%3===0}},{key:"isRegionRight",value:function(){return this.col%3===2}},{key:"isBoardTop",value:function(){return 0===this.row}},{key:"isBoardBottom",value:function(){return 8===this.row}},{key:"isBoardLeft",value:function(){return 0===this.col}},{key:"isBoardRight",value:function(){return 8===this.col}}]),e}());function H(e,t){return new Set(Object(D.a)(e).filter((function(e){return t.has(e)})))}var J=function(){function e(){Object(p.a)(this,e),this.cells=void 0,this.highlightMatching=void 0,this.multiSelectMode=void 0,this.cells=[];for(var t=0;t<81;t++)this.cells.push(new z(t));this.highlightMatching=null,this.multiSelectMode=!1}return Object(d.a)(e,[{key:"serialize",value:function(){var e=[];return this.cells.forEach((function(t){e.push({value:t.value,cornerValues:Array.from(t.cornerValues),centerValues:Array.from(t.centerValues)})})),JSON.stringify(e)}},{key:"load",value:function(e){this.clearAllErrors(),this.clearAllRestricteds(),this.clearAllSelections();for(var t=JSON.parse(e),n=0;n<81;n++)this.cells[n].value=t[n].value,this.cells[n].cornerValues=new Set(t[n].cornerValues),this.cells[n].centerValues=new Set(t[n].centerValues)}},{key:"isInside",value:function(e,t){return 0<=e&&e<9&&0<=t&&t<9}},{key:"toCellId",value:function(e,t){return 9*e+t}},{key:"toRowCol",value:function(e){return[~~(e/9),e%9]}},{key:"getRegionByPosition",value:function(e,t){return 3*~~(e/3)+~~(t/3)}},{key:"getRegion",value:function(e){var t=this.toRowCol(e),n=Object(g.a)(t,2),r=n[0],l=n[1];return this.getRegionByPosition(r,l)}},{key:"getVisibleCells",value:function(e,t){for(var n=this.toRowCol(e),r=Object(g.a)(n,2),l=r[0],a=r[1],i=new Set,o=0;o<9;o++)i.add(this.toCellId(l,o));for(var s=0;s<9;s++)i.add(this.toCellId(s,a));for(var c=this.getRegion(e),u=0;u<81;u++)this.getRegion(u)===c&&i.add(u);if(t.antiKnight)for(var h=-2;h<=2;h++)for(var p=-2;p<=2;p++)if(h*h+p*p===5){var d=l+h,f=a+p;this.isInside(d,f)&&i.add(this.toCellId(d,f))}if(t.antiKing)for(var v=-1;v<=1;v++)for(var O=-1;O<=1;O++){var b=l+v,y=a+O;this.isInside(b,y)&&i.add(this.toCellId(b,y))}return i.delete(e),i}},{key:"getInvalidCellIds",value:function(e){for(var t=this,n=new Set,r=function(r){var l=t.cells[r].value;l&&t.getVisibleCells(r,e).forEach((function(e){l===t.cells[e].value&&(n.add(r),n.add(e))}))},l=0;l<81;l++)r(l);return n}},{key:"getPossibleValues",value:function(e,t){var n,r,l=this,a=Array.from(this.getVisibleCells(e,t)).map((function(e){return l.cells[e].value})).filter((function(e){return e}));return n=new Set(["1","2","3","4","5","6","7","8","9"]),r=new Set(a),new Set(Object(D.a)(n).filter((function(e){return!r.has(e)})))}},{key:"fillAllPossibleValues",value:function(e){var t=this;this.cells.forEach((function(n){n.value||(n.centerValues=t.getPossibleValues(n.id,e))}))}},{key:"setSelected",value:function(e){this.cells[e].selected=!0}},{key:"getSelectedValues",value:function(){return new Set(this.cells.filter((function(e){return e.selected})).filter((function(e){return e.value})).map((function(e){return e.value})))}},{key:"setRestricted",value:function(e){for(var t=this,n=null,r=0;r<81;r++)this.cells[r].selected&&(n=null===n?this.getVisibleCells(r,e):H(this.getVisibleCells(r,e),n));n&&n.forEach((function(e){t.cells[e].restricted=!0}))}},{key:"setErrors",value:function(e){var t=this;e.forEach((function(e){t.cells[e].error=!0}))}},{key:"setValueOfSingleCell",value:function(e,t,n,r){var l=this;this.cells[e].value=t,r&&this.getVisibleCells(this.cells[e].id,n).forEach((function(e){l.cells[e].cornerValues.delete(t),l.cells[e].centerValues.delete(t)}))}},{key:"setValueOfSelectedCells",value:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.cells.forEach((function(l){l.selected&&n.setValueOfSingleCell(l.id,e,t,r)}))}},{key:"unsetSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&(e.value=null)}))}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.cornerValues.has(e)?t.cornerValues.delete(e):t.cornerValues.add(e))}))}},{key:"clearCornerValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.cornerValues.clear()}))}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.centerValues.has(e)?t.centerValues.delete(e):t.centerValues.add(e))}))}},{key:"clearCenterValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.centerValues.clear()}))}},{key:"clearAllSelections",value:function(){this.cells.forEach((function(e){e.selected=!1}))}},{key:"clearAllRestricteds",value:function(){this.cells.forEach((function(e){e.restricted=!1}))}},{key:"clearAllErrors",value:function(){this.cells.forEach((function(e){e.error=!1}))}}]),e}(),F=function e(){Object(p.a)(this,e),this.displayOptions=void 0,this.gameOptions=void 0,this.displayOptions={highlightRestricted:!0,highlightMatchingNumbers:!1,autoCleanUp:!1},this.gameOptions={antiKnight:!1,antiKing:!1}},X=n(33),Y=n.n(X),q=function e(){Object(p.a)(this,e),this.boards=void 0,this.id=void 0,this.boards=[],this.id=0;var t=new J;this.boards.push(t.serialize())},Q=Object(u.b)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new J,t=arguments.length>1?arguments[1]:void 0;if("ACTION_UPDATE_BOARD"===t.type)return t.payload.board;if("ACTION_UNDO"===t.type){var n=new J;return n.load(t.payload.serialized),n}if("ACTION_REDO"===t.type){var r=new J;return r.load(t.payload.serialized),r}if("ACTION_INIT_GAME_STATE"===t.type){for(var l=new J,a=0;a<81;a++){var i=t.payload.values[a];"0"!==i&&(l.cells[a].value=t.payload.values[a])}return l}return e},control:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new F,t=arguments.length>1?arguments[1]:void 0;return"ACTION_UPDATE_DISPLAY"===t.type?Object(h.a)(Object(h.a)({},e),{},{displayOptions:t.payload}):"ACTION_UPDATE_GAME_PLAY"===t.type?Object(h.a)(Object(h.a)({},e),{},{gameOptions:t.payload}):"ACTION_INIT_GAME_STATE"===t.type?Object(h.a)(Object(h.a)({},e),{},{gameOptions:t.payload.gameOptions}):e},history:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new q,t=arguments.length>1?arguments[1]:void 0;if("ACTION_UPDATE_BOARD"===t.type){var n=t.payload.board.serialize();return n!==e.boards[e.id]&&(e.boards=e.boards.slice(0,e.id+1),e.boards.push(n),e.id+=1),e}return"ACTION_UNDO"===t.type?(Y()(e.id>0),Object(h.a)(Object(h.a)({},e),{},{id:e.id-1})):"ACTION_REDO"===t.type?(Y()(e.id+1<e.boards.length),Object(h.a)(Object(h.a)({},e),{},{id:e.id+1})):e},isMouseDown:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e},highlightMatching:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return e},gameUrl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"ACTION_GENERATE_URL"===t.type?t.payload.url:e}}),W=Object(u.c)(Q,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());i.a.render(l.a.createElement(o.a,{store:W},l.a.createElement(s.a,null,l.a.createElement(c.a,{path:"/:encoded?",component:x}))),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.df844a07.chunk.js.map
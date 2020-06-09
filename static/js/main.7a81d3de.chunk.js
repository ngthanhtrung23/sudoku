(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{32:function(e,t,r){e.exports=r(48)},47:function(e,t,r){},48:function(e,t,r){"use strict";r.r(t);var n=r(0),l=r.n(n),i=r(18),a=r.n(i),o=r(13),s=r(14),c=r(5),u=r(6),h=r(7),p=r(10),d=r(9),f=function(e){Object(p.a)(r,e);var t=Object(d.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(h.a)(r,[{key:"renderCellMainValue",value:function(){if(this.props.cell.value)return l.a.createElement("span",{className:"cell-main-value"},this.props.cell.value)}},{key:"shouldHighlightMatching",value:function(e){return this.props.highlightMatching&&e===this.props.highlightMatching}},{key:"renderCellCornerValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.cornerValues).sort().map((function(t){var r=e.shouldHighlightMatching(t)?"matching":"";return l.a.createElement("span",{className:r,key:"corner-"+e.props.cell.id+"-"+t},t)}));return l.a.createElement("span",{className:"cell-corner-value"},t)}}},{key:"renderCellCenterValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.centerValues).sort().map((function(t){var r=e.shouldHighlightMatching(t)?"matching":"";return l.a.createElement("span",{className:r,key:"center-"+e.props.cell.id+"-"+t},t)}));return l.a.createElement("span",{className:"cell-center-value"},t)}}},{key:"render",value:function(){var e=["cell"];return this.props.cell.isRegionTop()&&e.push("region-top"),this.props.cell.isRegionLeft()&&e.push("region-left"),this.props.cell.isBoardLeft()&&e.push("board-left"),this.props.cell.isBoardRight()&&e.push("board-right"),this.props.cell.isBoardTop()&&e.push("board-top"),this.props.cell.isBoardBottom()&&e.push("board-bottom"),this.props.cell.selected?e.push("selected"):this.shouldHighlightMatching(this.props.cell.value)?e.push("matching"):this.props.cell.restricted&&e.push("restricted"),this.props.cell.error&&e.push("error"),l.a.createElement("div",{className:e.join(" "),onClick:this.props.onClick,onMouseDown:this.props.onMouseDown,onMouseOver:this.props.onMouseOver,key:this.props.cell.id},this.renderCellMainValue(),this.renderCellCornerValues(),this.renderCellCenterValues())}}]),r}(l.a.Component),v=function(e){Object(p.a)(r,e);var t=Object(d.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(h.a)(r,[{key:"renderCell",value:function(e){var t=this;return l.a.createElement(f,{cell:this.props.board.cells[e],onClick:function(r){return t.props.onClick(r,e)},onMouseDown:function(r){return t.props.onMouseDown(r,e)},onMouseOver:function(){return t.props.onMouseOver(e)},key:String(e),highlightMatching:this.props.board.highlightMatching})}},{key:"renderRow",value:function(e){for(var t=[],r=e;r<e+9;r++)t.push(this.renderCell(r));return l.a.createElement("div",{className:"row",key:e},t)}},{key:"render",value:function(){for(var e=[],t=0;t<81;t+=9)e.push(this.renderRow(t));return l.a.createElement("div",null,e)}}]),r}(l.a.Component),g=r(17),y=r(12),b={type:"ACTION_NO_OP"},m=function(e){Object(p.a)(r,e);var t=Object(d.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(h.a)(r,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"display-options"},l.a.createElement("h4",null,"Display Options"),l.a.createElement(y.a.Check,{type:"checkbox",id:"checkbox-highlight-restricted",label:"Highlight restricted cells",checked:this.props.highlightRestricted,onChange:function(){return e.props.updateDisplay(Object(c.a)(Object(c.a)({},e.props),{},{highlightRestricted:!e.props.highlightRestricted}))}}),l.a.createElement(y.a.Check,{type:"checkbox",id:"checkbox-highlight-matching-numbers",label:"Highlight matching numbers",checked:this.props.highlightMatchingNumbers,onChange:function(){return e.props.updateDisplay(Object(c.a)(Object(c.a)({},e.props),{},{highlightMatchingNumbers:!e.props.highlightMatchingNumbers}))}}),l.a.createElement(y.a.Check,{type:"checkbox",id:"checkbox-auto-cleanup",label:"Auto Cleanup corner & center values",checked:this.props.autoCleanUp,onChange:function(){return e.props.updateDisplay(Object(c.a)(Object(c.a)({},e.props),{},{autoCleanUp:!e.props.autoCleanUp}))}}))}}]),r}(l.a.Component),O=Object(o.b)((function(e){return Object(c.a)({},e.control.displayOptions)}),{updateDisplay:function(e){return{type:"ACTION_UPDATE_DISPLAY",payload:e}}})(m),C=function(e){Object(p.a)(r,e);var t=Object(d.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(h.a)(r,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"game-play"},l.a.createElement("h4",null,"Game Play"),l.a.createElement(y.a.Check,{type:"checkbox",id:"checkbox-anti-knight",label:"Anti Knight",checked:this.props.antiKnight,onChange:function(){return e.props.updateGamePlay(Object(c.a)(Object(c.a)({},e.props),{},{antiKnight:!e.props.antiKnight}))}}),l.a.createElement(y.a.Check,{type:"checkbox",id:"checkbox-anti-king",label:"Anti King",checked:this.props.antiKing,onChange:function(){return e.props.updateGamePlay(Object(c.a)(Object(c.a)({},e.props),{},{antiKing:!e.props.antiKing}))}}))}}]),r}(l.a.Component),k=Object(o.b)((function(e){return Object(c.a)({},e.control.gamePlay)}),{updateGamePlay:function(e){return{type:"ACTION_UPDATE_GAME_PLAY",payload:e}}})(C),E=function(e){Object(p.a)(r,e);var t=Object(d.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(h.a)(r,[{key:"render",value:function(){return l.a.createElement(y.a,null,l.a.createElement("div",{className:""},l.a.createElement(g.a,{onClick:this.props.onClickVerify},"Verify"),"\xa0",l.a.createElement(g.a,{onClick:this.props.onClickUndo,className:"btn-secondary"},"Undo"),"\xa0",l.a.createElement(g.a,{onClick:this.props.onClickRedo,className:"btn-secondary"},"Redo")),l.a.createElement("hr",null),l.a.createElement(O,null),l.a.createElement("hr",null),l.a.createElement(k,null),l.a.createElement("hr",null),l.a.createElement("h4",null,"Help"),l.a.createElement(g.a,{onClick:this.props.onClickFillCenters,className:"btn-secondary"},"Fill all center values"))}}]),r}(l.a.Component),j=r(16),V=r(8),A=r(11),w=r.n(A),D=function(e){return e.id>=e.boards.length-1?b:{type:"ACTION_REDO",payload:{serialized:e.boards[e.id+1]}}},M=function(e){return 0===e.id?b:{type:"ACTION_UNDO",payload:{serialized:e.boards[e.id-1]}}},S=function(e){return{type:"ACTION_UPDATE_BOARD",payload:{board:e}}},N=function(e,t,r){var n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=w.a.cloneDeep(e);if(null!==l&&(i.multiSelectMode=l),n?(i.clearAllSelections(),i.clearAllRestricteds(),i.highlightMatching=null):i.clearAllRestricteds(),i.setSelected(r),t.displayOptions.highlightRestricted&&i.setRestricted(t.gamePlay),t.displayOptions.highlightMatchingNumbers){i.highlightMatching=null;var a=i.getSelectedValues();if(1===a.size){var o=a.values().next().value;i.highlightMatching=o}}return S(i)},R=function(e,t,r,n){for(var l=0,i=0,a=0;a<81;a++)if(e.cells[a].selected){var o=e.toRowCol(a),s=Object(j.a)(o,2);l=s[0],i=s[1];break}return l=(l+r+9)%9,i=(i+n+9)%9,N(e,t,e.toCellId(l,i))},I=function(e){Object(p.a)(r,e);var t=Object(d.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(h.a)(r,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{onKeyDown:function(t){return e.props.keyDown(e.props.board,e.props.control,e.props.history,t)},tabIndex:0,className:"container",onMouseUp:function(){return e.props.mouseUp(e.props.board)}},l.a.createElement("h1",null,"Sudoku Tool"),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-sm"},l.a.createElement(v,{board:this.props.board,onClick:function(t,r){return e.props.select(e.props.board,e.props.control,r,!t.metaKey)},onMouseDown:function(t,r){return e.props.mouseDown(e.props.board,e.props.control,r,!t.metaKey)},onMouseOver:function(t){return e.props.mouseOver(e.props.board,e.props.control,t)}})),l.a.createElement("div",{className:"col-sm"},l.a.createElement(E,{onClickVerify:function(){return e.props.verify(e.props.board,e.props.control)},onClickUndo:function(){return e.props.undo(e.props.history)},onClickRedo:function(){return e.props.redo(e.props.history)},onClickFillCenters:function(){return e.props.fillCenter(e.props.board,e.props.control)}}))))}}]),r}(l.a.Component),P=Object(o.b)((function(e){return Object(c.a)({},e)}),{redo:D,undo:M,keyDown:function(e,t,r,n){var l=!!n.shiftKey,i=!!n.metaKey;if(n.keyCode>=V.a&&n.keyCode<=V.b){var a=String.fromCharCode(n.keyCode);return l?function(e,t){var r=w.a.cloneDeep(e);return r.toggleCornerValuesOfSelectedCells(t),S(r)}(e,a):i?(n.preventDefault(),function(e,t){var r=w.a.cloneDeep(e);return r.toggleCenterValuesOfSelectedCells(t),S(r)}(e,a)):function(e,t,r){var n=w.a.cloneDeep(e);if(n.clearAllErrors(),n.setValueOfSelectedCells(r,t.gamePlay,t.displayOptions.autoCleanUp),t.displayOptions.highlightMatchingNumbers){n.highlightMatching=null;var l=n.getSelectedValues();if(1===l.size){var i=l.values().next().value;n.highlightMatching=i}}return S(n)}(e,t,a)}switch(n.keyCode){case V.i:return function(e){var t=w.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),S(t)}(e);case V.c:return n.preventDefault(),function(e){var t=w.a.cloneDeep(e);return t.clearAllErrors(),t.unsetSelectedCells(),t.clearCornerValuesOfSelectedCells(),t.clearCenterValuesOfSelectedCells(),S(t)}(e);case V.d:return R(e,t,1,0);case V.k:return R(e,t,-1,0);case V.f:return R(e,t,0,-1);case V.h:return R(e,t,0,1);case V.e:return function(e){var t=w.a.cloneDeep(e);return t.clearAllSelections(),t.clearAllRestricteds(),t.highlightMatching=null,S(t)}(e);case V.m:case V.j:return M(r);case V.l:case V.g:return D(r)}return b},mouseDown:function(e,t,r,n){return N(e,t,r,n,!0)},mouseOver:function(e,t,r){return e.multiSelectMode?N(e,t,r,!1):b},mouseUp:function(e){return S(Object.assign(e,{multiSelectMode:!1}))},select:N,fillCenter:function(e,t){var r=w.a.cloneDeep(e);return r.fillAllPossibleValues(t.gamePlay),S(r)},verify:function(e,t){var r=w.a.cloneDeep(e);r.clearAllErrors();var n=r.getInvalidCellIds(t.gamePlay);return r.setErrors(n),alert(n.size>0?"Error found :(":"LGTM!"),S(r)}})(I),T=function e(){Object(u.a)(this,e),this.displayOptions=void 0,this.gamePlay=void 0,this.displayOptions={highlightRestricted:!0,highlightMatchingNumbers:!1,autoCleanUp:!1},this.gamePlay={antiKnight:!1,antiKing:!1}},_=r(27),U=function(){function e(t){Object(u.a)(this,e),this.value=void 0,this.cornerValues=void 0,this.centerValues=void 0,this.selected=void 0,this.restricted=void 0,this.error=void 0,this.row=void 0,this.col=void 0,this.id=void 0,this.value=null,this.cornerValues=new Set,this.centerValues=new Set,this.selected=!1,this.restricted=!1,this.error=!1,this.row=~~(t/9),this.col=t%9,this.id=t}return Object(h.a)(e,[{key:"isRegionTop",value:function(){return this.row%3===0}},{key:"isRegionBottom",value:function(){return this.row%3===2}},{key:"isRegionLeft",value:function(){return this.col%3===0}},{key:"isRegionRight",value:function(){return this.col%3===2}},{key:"isBoardTop",value:function(){return 0===this.row}},{key:"isBoardBottom",value:function(){return 8===this.row}},{key:"isBoardLeft",value:function(){return 0===this.col}},{key:"isBoardRight",value:function(){return 8===this.col}}]),e}();function B(e,t){return new Set(Object(_.a)(e).filter((function(e){return t.has(e)})))}var K=function(){function e(){Object(u.a)(this,e),this.cells=void 0,this.highlightMatching=void 0,this.multiSelectMode=void 0,this.cells=[];for(var t=0;t<81;t++)this.cells.push(new U(t));this.highlightMatching=null,this.multiSelectMode=!1}return Object(h.a)(e,[{key:"serialize",value:function(){var e=[];return this.cells.forEach((function(t){e.push({value:t.value,cornerValues:Array.from(t.cornerValues),centerValues:Array.from(t.centerValues)})})),JSON.stringify(e)}},{key:"load",value:function(e){this.clearAllErrors(),this.clearAllRestricteds(),this.clearAllSelections();for(var t=JSON.parse(e),r=0;r<81;r++)this.cells[r].value=t[r].value,this.cells[r].cornerValues=new Set(t[r].cornerValues),this.cells[r].centerValues=new Set(t[r].centerValues)}},{key:"isInside",value:function(e,t){return 0<=e&&e<9&&0<=t&&t<9}},{key:"toCellId",value:function(e,t){return 9*e+t}},{key:"toRowCol",value:function(e){return[~~(e/9),e%9]}},{key:"getRegionByPosition",value:function(e,t){return 3*~~(e/3)+~~(t/3)}},{key:"getRegion",value:function(e){var t=this.toRowCol(e),r=Object(j.a)(t,2),n=r[0],l=r[1];return this.getRegionByPosition(n,l)}},{key:"getVisibleCells",value:function(e,t){for(var r=this.toRowCol(e),n=Object(j.a)(r,2),l=n[0],i=n[1],a=new Set,o=0;o<9;o++)a.add(this.toCellId(l,o));for(var s=0;s<9;s++)a.add(this.toCellId(s,i));for(var c=this.getRegion(e),u=0;u<81;u++)this.getRegion(u)===c&&a.add(u);if(t.antiKnight)for(var h=-2;h<=2;h++)for(var p=-2;p<=2;p++)if(h*h+p*p===5){var d=l+h,f=i+p;this.isInside(d,f)&&a.add(this.toCellId(d,f))}if(t.antiKing)for(var v=-1;v<=1;v++)for(var g=-1;g<=1;g++){var y=l+v,b=i+g;this.isInside(y,b)&&a.add(this.toCellId(y,b))}return a.delete(e),a}},{key:"getInvalidCellIds",value:function(e){for(var t=this,r=new Set,n=function(n){var l=t.cells[n].value;l&&t.getVisibleCells(n,e).forEach((function(e){l===t.cells[e].value&&(r.add(n),r.add(e))}))},l=0;l<81;l++)n(l);return r}},{key:"getPossibleValues",value:function(e,t){var r,n,l=this,i=Array.from(this.getVisibleCells(e,t)).map((function(e){return l.cells[e].value})).filter((function(e){return e}));return r=new Set(["1","2","3","4","5","6","7","8","9"]),n=new Set(i),new Set(Object(_.a)(r).filter((function(e){return!n.has(e)})))}},{key:"fillAllPossibleValues",value:function(e){var t=this;this.cells.forEach((function(r){r.value||(r.centerValues=t.getPossibleValues(r.id,e))}))}},{key:"setSelected",value:function(e){this.cells[e].selected=!0}},{key:"getSelectedValues",value:function(){return new Set(this.cells.filter((function(e){return e.selected})).filter((function(e){return e.value})).map((function(e){return e.value})))}},{key:"setRestricted",value:function(e){for(var t=this,r=null,n=0;n<81;n++)this.cells[n].selected&&(r=null===r?this.getVisibleCells(n,e):B(this.getVisibleCells(n,e),r));r&&r.forEach((function(e){t.cells[e].restricted=!0}))}},{key:"setErrors",value:function(e){var t=this;e.forEach((function(e){t.cells[e].error=!0}))}},{key:"setValueOfSelectedCells",value:function(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.cells.forEach((function(l){l.selected&&(l.value=e,n&&r.getVisibleCells(l.id,t).forEach((function(t){r.cells[t].cornerValues.delete(e),r.cells[t].centerValues.delete(e)})))}))}},{key:"unsetSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&(e.value=null)}))}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.cornerValues.has(e)?t.cornerValues.delete(e):t.cornerValues.add(e))}))}},{key:"clearCornerValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.cornerValues.clear()}))}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.centerValues.has(e)?t.centerValues.delete(e):t.centerValues.add(e))}))}},{key:"clearCenterValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.centerValues.clear()}))}},{key:"clearAllSelections",value:function(){this.cells.forEach((function(e){e.selected=!1}))}},{key:"clearAllRestricteds",value:function(){this.cells.forEach((function(e){e.restricted=!1}))}},{key:"clearAllErrors",value:function(){this.cells.forEach((function(e){e.error=!1}))}}]),e}(),x=r(26),z=r.n(x),L=function e(){Object(u.a)(this,e),this.boards=void 0,this.id=void 0,this.boards=[],this.id=0;var t=new K;this.boards.push(t.serialize())},G=Object(s.b)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new K,t=arguments.length>1?arguments[1]:void 0;if("ACTION_UPDATE_BOARD"===t.type)return t.payload.board;if("ACTION_UNDO"===t.type){var r=new K;return r.load(t.payload.serialized),r}if("ACTION_REDO"===t.type){var n=new K;return n.load(t.payload.serialized),n}return e},control:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new T,t=arguments.length>1?arguments[1]:void 0;return"ACTION_UPDATE_DISPLAY"===t.type?Object(c.a)(Object(c.a)({},e),{},{displayOptions:t.payload}):"ACTION_UPDATE_GAME_PLAY"===t.type?Object(c.a)(Object(c.a)({},e),{},{gamePlay:t.payload}):e},history:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new L,t=arguments.length>1?arguments[1]:void 0;if("ACTION_UPDATE_BOARD"===t.type){var r=t.payload.board.serialize();return r!==e.boards[e.id]&&(e.boards=e.boards.slice(0,e.id+1),e.boards.push(r),e.id+=1),e}return"ACTION_UNDO"===t.type?(z()(e.id>0),Object(c.a)(Object(c.a)({},e),{},{id:e.id-1})):"ACTION_REDO"===t.type?(z()(e.id+1<e.boards.length),Object(c.a)(Object(c.a)({},e),{},{id:e.id+1})):e},isMouseDown:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e},highlightMatching:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return e}});r(47);a.a.render(l.a.createElement(o.a,{store:Object(s.c)(G)},l.a.createElement(P,null)),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.7a81d3de.chunk.js.map
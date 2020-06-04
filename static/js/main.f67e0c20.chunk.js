(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{23:function(e,t,l){e.exports=l(35)},34:function(e,t,l){},35:function(e,t,l){"use strict";l.r(t);var n=l(12),i=l(6),o=l(7),s=l(9),a=l(8),r=l(0),c=l.n(r),h=l(20),u=l.n(h),g=l(14),d=l.n(g),f=l(5),v=function(e){Object(s.a)(l,e);var t=Object(a.a)(l);function l(){return Object(i.a)(this,l),t.apply(this,arguments)}return Object(o.a)(l,[{key:"renderCellMainValue",value:function(){if(this.props.cell.value)return c.a.createElement("span",{className:"cell-main-value"},this.props.cell.value)}},{key:"shouldHighlightMatching",value:function(e){return this.props.highlightMatching&&e===this.props.highlightMatching}},{key:"renderCellCornerValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.cornerValues).sort().map((function(t){var l=e.shouldHighlightMatching(t)?"matching":"";return c.a.createElement("span",{className:l},t)}));return c.a.createElement("span",{className:"cell-corner-value"},t)}}},{key:"renderCellCenterValues",value:function(){var e=this;if(!this.props.cell.value){var t=Array.from(this.props.cell.centerValues).sort().map((function(t){var l=e.shouldHighlightMatching(t)?"matching":"";return c.a.createElement("span",{className:l},t)}));return c.a.createElement("span",{className:"cell-center-value"},t)}}},{key:"render",value:function(){var e=["cell"];return this.props.cell.isRegionTop()&&e.push("region-top"),this.props.cell.isRegionLeft()&&e.push("region-left"),this.props.cell.isBoardLeft()&&e.push("board-left"),this.props.cell.isBoardRight()&&e.push("board-right"),this.props.cell.isBoardTop()&&e.push("board-top"),this.props.cell.isBoardBottom()&&e.push("board-bottom"),this.props.cell.selected?e.push("selected"):this.shouldHighlightMatching(this.props.cell.value)?e.push("matching"):this.props.cell.restricted&&e.push("restricted"),this.props.cell.error&&e.push("error"),c.a.createElement("div",{className:e.join(" "),onClick:this.props.onClick,onMouseDown:this.props.onMouseDown,onMouseOver:this.props.onMouseOver,key:this.props.cell.id},this.renderCellMainValue(),this.renderCellCornerValues(),this.renderCellCenterValues())}}]),l}(c.a.Component),p=function(e){Object(s.a)(l,e);var t=Object(a.a)(l);function l(){return Object(i.a)(this,l),t.apply(this,arguments)}return Object(o.a)(l,[{key:"renderCell",value:function(e){var t=this;return c.a.createElement(v,{cell:this.props.board.cells[e],onClick:function(l){return t.props.onClick(l,e)},onMouseDown:function(l){return t.props.onMouseDown(l,e)},onMouseOver:function(){return t.props.onMouseOver(e)},key:e,highlightMatching:this.props.highlightMatching})}},{key:"renderRow",value:function(e){for(var t=[],l=e;l<e+9;l++)t.push(this.renderCell(l));return c.a.createElement("div",{className:"row",key:e},t)}},{key:"render",value:function(){for(var e=[],t=0;t<81;t+=9)e.push(this.renderRow(t));return c.a.createElement("div",null,e)}}]),l}(c.a.Component),y=l(15),C=l(10),k=function(e){Object(s.a)(l,e);var t=Object(a.a)(l);function l(){return Object(i.a)(this,l),t.apply(this,arguments)}return Object(o.a)(l,[{key:"render",value:function(){return c.a.createElement(C.a,null,c.a.createElement("div",{className:""},c.a.createElement(y.a,{onClick:this.props.onClickVerify},"Verify"),"\xa0",c.a.createElement(y.a,{onClick:this.props.onClickUndo,className:"btn-secondary"},"Undo"),"\xa0",c.a.createElement(y.a,{onClick:this.props.onClickRedo,className:"btn-secondary"},"Redo")),c.a.createElement("hr",null),c.a.createElement("h4",null,"Display Options"),c.a.createElement(C.a.Check,{type:"checkbox",id:"checkbox-highlight-restricted",label:"Highlight restricted cells",checked:this.props.control.displayOptions.highlightRestricted,onChange:this.props.onToggleHighlightRestricted}),c.a.createElement(C.a.Check,{type:"checkbox",id:"checkbox-highlight-matching-numbers",label:"Highlight matching numbers",checked:this.props.control.displayOptions.highlightMatchingNumbers,onChange:this.props.onToggleHighlightMatchingNumbers}),c.a.createElement(C.a.Check,{type:"checkbox",id:"checkbox-auto-cleanup",label:"Auto Cleanup corner & center values",checked:this.props.control.displayOptions.autoCleanUp,onChange:this.props.onToggleAutoCleanUp}),c.a.createElement("hr",null),c.a.createElement("h4",null,"Game Play"),c.a.createElement(C.a.Check,{type:"checkbox",id:"checkbox-anti-knight",label:"Anti Knight",checked:this.props.control.gamePlay.antiKnight,onChange:this.props.onToggleAntiKnight}),c.a.createElement(C.a.Check,{type:"checkbox",id:"checkbox-anti-king",label:"Anti King",checked:this.props.control.gamePlay.antiKing,onChange:this.props.onToggleAntiKing}))}}]),l}(c.a.Component),m=l(22),b=function(){function e(t){Object(i.a)(this,e),this.value=null,this.cornerValues=new Set,this.centerValues=new Set,this.selected=!1,this.restricted=!1,this.error=!1,this.row=~~(t/9),this.col=t%9,this.id=t}return Object(o.a)(e,[{key:"isRegionTop",value:function(){return this.row%3===0}},{key:"isRegionBottom",value:function(){return this.row%3===2}},{key:"isRegionLeft",value:function(){return this.col%3===0}},{key:"isRegionRight",value:function(){return this.col%3===2}},{key:"isBoardTop",value:function(){return 0===this.row}},{key:"isBoardBottom",value:function(){return 8===this.row}},{key:"isBoardLeft",value:function(){return 0===this.col}},{key:"isBoardRight",value:function(){return 8===this.col}}]),e}();function O(e,t){return new Set(Object(m.a)(e).filter((function(e){return t.has(e)})))}var S=function(){function e(){Object(i.a)(this,e),this.cells=[];for(var t=0;t<81;t++)this.cells.push(new b(t))}return Object(o.a)(e,[{key:"serialize",value:function(){var e=[];return this.cells.forEach((function(t){e.push({value:t.value,cornerValues:Array.from(t.cornerValues),centerValues:Array.from(t.centerValues)})})),JSON.stringify(e)}},{key:"load",value:function(e){this.clearAllErrors(),this.clearAllRestricteds(),this.clearAllSelections();for(var t=JSON.parse(e),l=0;l<81;l++)this.cells[l].value=t[l].value,this.cells[l].cornerValues=new Set(t[l].cornerValues),this.cells[l].centerValues=new Set(t[l].centerValues)}},{key:"isInside",value:function(e,t){return 0<=e&&e<9&&0<=t&&t<9}},{key:"toCellId",value:function(e,t){return 9*e+t}},{key:"toRowCol",value:function(e){return[~~(e/9),e%9]}},{key:"getRegionByPosition",value:function(e,t){return 3*~~(e/3)+~~(t/3)}},{key:"getRegion",value:function(e){var t=this.toRowCol(e),l=Object(n.a)(t,2),i=l[0],o=l[1];return this.getRegionByPosition(i,o)}},{key:"getVisibleCells",value:function(e,t){for(var l=this.toRowCol(e),i=Object(n.a)(l,2),o=i[0],s=i[1],a=new Set,r=0;r<9;r++)a.add(this.toCellId(o,r));for(var c=0;c<9;c++)a.add(this.toCellId(c,s));for(var h=this.getRegion(e),u=0;u<81;u++)this.getRegion(u)===h&&a.add(u);if(t.antiKnight)for(var g=-2;g<=2;g++)for(var d=-2;d<=2;d++)if(g*g+d*d===5){var f=o+g,v=s+d;this.isInside(f,v)&&a.add(this.toCellId(f,v))}if(t.antiKing)for(var p=-1;p<=1;p++)for(var y=-1;y<=1;y++){var C=o+p,k=s+y;this.isInside(C,k)&&a.add(this.toCellId(C,k))}return a.delete(e),a}},{key:"getInvalidCellIds",value:function(e){for(var t=this,l=new Set,n=function(n){var i=t.cells[n].value;i&&t.getVisibleCells(n,e).forEach((function(e){i===t.cells[e].value&&(l.add(n),l.add(e))}))},i=0;i<81;i++)n(i);return l}},{key:"setSelected",value:function(e){this.cells[e].selected=!0}},{key:"setRestricted",value:function(e){for(var t=this,l=null,n=0;n<81;n++)this.cells[n].selected&&(l=null===l?this.getVisibleCells(n,e):O(this.getVisibleCells(n,e),l));l.forEach((function(e){t.cells[e].restricted=!0}))}},{key:"setErrors",value:function(e){var t=this;e.forEach((function(e){t.cells[e].error=!0}))}},{key:"setValueOfSelectedCells",value:function(e,t){var l=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.cells.forEach((function(i){i.selected&&(i.value=e,n&&l.getVisibleCells(i.id,t).forEach((function(t){l.cells[t].cornerValues.delete(e),l.cells[t].centerValues.delete(e)})))}))}},{key:"unsetSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&(e.value=null)}))}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.cornerValues.has(e)?t.cornerValues.delete(e):t.cornerValues.add(e))}))}},{key:"clearCornerValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.cornerValues.clear()}))}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.centerValues.has(e)?t.centerValues.delete(e):t.centerValues.add(e))}))}},{key:"clearCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(e){e.selected&&e.centerValues.clear()}))}},{key:"clearAllSelections",value:function(){this.cells.forEach((function(e){e.selected=!1}))}},{key:"clearAllRestricteds",value:function(){this.cells.forEach((function(e){e.restricted=!1}))}},{key:"clearAllErrors",value:function(){this.cells.forEach((function(e){e.error=!1}))}}]),e}(),w=function(){function e(){Object(i.a)(this,e),this.displayOptions={highlightRestricted:!0,highlightMatchingNumbers:!1,autoCleanUp:!1},this.gamePlay={antiKnight:!1,antiKing:!1}}return Object(o.a)(e,[{key:"toggleHighlightRestricted",value:function(){this.displayOptions.highlightRestricted=!this.displayOptions.highlightRestricted}},{key:"toggleHighlightMatchingNumbers",value:function(){this.displayOptions.highlightMatchingNumbers=!this.displayOptions.highlightMatchingNumbers}},{key:"toggleAutoCleanUp",value:function(){this.displayOptions.autoCleanUp=!this.displayOptions.autoCleanUp}},{key:"toggleAntiKnight",value:function(){this.gamePlay.antiKnight=!this.gamePlay.antiKnight}},{key:"toggleAntiKing",value:function(){this.gamePlay.antiKing=!this.gamePlay.antiKing}}]),e}(),V=(l(33),l(34),function(e){Object(s.a)(l,e);var t=Object(a.a)(l);function l(e){var n;return Object(i.a)(this,l),(n=t.call(this,e)).state={board:new S,control:new w,history:[],historyId:0,isMouseDown:!1,highlightMatching:null},n.state.history.push(n.state.board.serialize()),n}return Object(o.a)(l,[{key:"cloneBoard",value:function(){return d.a.clone(this.state.board,!0)}},{key:"cloneControl",value:function(){return d.a.clone(this.state.control,!0)}},{key:"assignNewBoard",value:function(e){var t=e.serialize(),l=this.state.history,n=this.state.historyId;t!==this.state.history[n]&&((l=d.a.slice(l,0,n+1)).push(t),n+=1),this.setState({board:e,history:l,historyId:n})}},{key:"undo",value:function(){if(0!==this.state.historyId){var e=new S;e.load(this.state.history[this.state.historyId-1]),this.setState({board:e,historyId:this.state.historyId-1})}}},{key:"redo",value:function(){if(!(this.state.historyId>=this.state.history.length-1)){var e=new S;e.load(this.state.history[this.state.historyId+1]),this.setState({board:e,historyId:this.state.historyId+1})}}},{key:"assignNewControl",value:function(e){this.setState({control:e})}},{key:"clearSelectionAndRestricted",value:function(){console.log("clearSelectionAndRestricted");var e=this.cloneBoard();e.clearAllSelections(),e.clearAllRestricteds(),this.assignNewBoard(e),this.setState({highlightMatching:null})}},{key:"select",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];console.log("select "+e);var l=this.cloneBoard();if(t?this.clearSelectionAndRestricted():l.clearAllRestricteds(),l.setSelected(e),this.state.control.displayOptions.highlightRestricted&&l.setRestricted(this.state.control.gamePlay),this.assignNewBoard(l),this.state.control.displayOptions.highlightMatchingNumbers){var n=new Set(l.cells.filter((function(e){return e.selected})).filter((function(e){return e.value})).map((function(e){return e.value})));if(1===n.size){var i=n.values().next().value;this.setState({highlightMatching:i})}}}},{key:"handleClick",value:function(e,t){console.log("handleClick "+t),this.select(t,!e.metaKey)}},{key:"handleMouseDown",value:function(e,t){console.log("handleMouseDown "+t),this.setState({isMouseDown:!0}),this.select(t,!e.metaKey)}},{key:"handleMouseOver",value:function(e){this.state.isMouseDown&&(console.log("handleMouseOver "+e),this.select(e,!1))}},{key:"handleMouseUp",value:function(){console.log("handleMouseUp"),this.setState({isMouseDown:!1})}},{key:"setValueOfSelectedCells",value:function(e){console.log("setValueOfSelectedCells "+e),this.clearAllError();var t=this.cloneBoard();t.setValueOfSelectedCells(e,this.state.control.gamePlay,this.state.control.displayOptions.autoCleanUp),this.assignNewBoard(t)}},{key:"unsetSelectedCells",value:function(){console.log("unsetSelectedCells"),this.clearAllError();var e=this.cloneBoard();e.unsetSelectedCells(),this.assignNewBoard(e)}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){console.log("toggleCornerValuesOfSelectedCells "+e);var t=this.cloneBoard();t.toggleCornerValuesOfSelectedCells(e),this.assignNewBoard(t)}},{key:"clearCornerValuesOfSelectedCells",value:function(){console.log("clearCornerValuesOfSelectedCells");var e=this.cloneBoard();e.clearCornerValuesOfSelectedCells(),this.assignNewBoard(e)}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){console.log("toggleCenterValuesOfSelectedCells "+e);var t=this.cloneBoard();t.toggleCenterValuesOfSelectedCells(e),this.assignNewBoard(t)}},{key:"clearCenterValuesOfSelectedCells",value:function(){console.log("clearCenterValuesOfSelectedCells");var e=this.cloneBoard();e.clearCenterValuesOfSelectedCells(),this.assignNewBoard(e)}},{key:"clearAllError",value:function(){console.log("clearAllError");var e=this.cloneBoard();e.clearAllErrors(),this.assignNewBoard(e)}},{key:"verifyBoard",value:function(){console.log("verifyBoard");var e=this.cloneBoard();e.clearAllErrors();var t=e.getInvalidCellIds(this.state.control.gamePlay);e.setErrors(t),this.assignNewBoard(e),alert(t.size>0?"Error found :(":"LGTM!")}},{key:"moveSelection",value:function(e,t){for(var l=0,i=0,o=0;o<81;o++)if(this.state.board.cells[o].selected){console.log(this.state);var s=this.state.board.toRowCol(o),a=Object(n.a)(s,2);l=a[0],i=a[1];break}l=(l+e+9)%9,i=(i+t+9)%9,this.select(this.state.board.toCellId(l,i))}},{key:"handleKeyDown",value:function(e){console.log("handleKeyDown, keyCode = "+e.keyCode);var t=!!e.shiftKey,l=!!e.metaKey;if(e.keyCode>=f.a&&e.keyCode<=f.b){var n=String.fromCharCode(e.keyCode);t?this.toggleCornerValuesOfSelectedCells(n):l?(this.toggleCenterValuesOfSelectedCells(n),e.preventDefault()):this.setValueOfSelectedCells(n)}switch(e.keyCode){case f.i:this.unsetSelectedCells();break;case f.c:this.unsetSelectedCells(),this.clearCornerValuesOfSelectedCells(),this.clearCenterValuesOfSelectedCells(),e.preventDefault();break;case f.d:this.moveSelection(1,0);break;case f.k:this.moveSelection(-1,0);break;case f.f:this.moveSelection(0,-1);break;case f.h:this.moveSelection(0,1);break;case f.e:this.clearSelectionAndRestricted();break;case f.m:case f.j:this.undo();break;case f.l:case f.g:this.redo()}}},{key:"handleToggleHighlightRestricted",value:function(){console.log("handleToggleHighlightRestricted");var e=this.cloneControl();e.toggleHighlightRestricted(),this.assignNewControl(e)}},{key:"handleToggleHighlightMatchingNumbers",value:function(){console.log("handleToggleHighlightMatchingNumbers");var e=this.cloneControl();e.toggleHighlightMatchingNumbers(),this.assignNewControl(e)}},{key:"handleToggleAutoCleanUp",value:function(){console.log("handleToggleAutoCleanUp");var e=this.cloneControl();e.toggleAutoCleanUp(),this.assignNewControl(e)}},{key:"handleToggleAntiKnight",value:function(){console.log("handleToggleAntiKnight");var e=this.cloneControl();e.toggleAntiKnight(),this.assignNewControl(e)}},{key:"handleToggleAntiKing",value:function(){console.log("handleToggleAntiKing");var e=this.cloneControl();e.toggleAntiKing(),this.assignNewControl(e)}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{onKeyDown:function(t){return e.handleKeyDown(t)},tabIndex:"0",className:"container",onMouseUp:function(){return e.handleMouseUp()}},c.a.createElement("h1",null,"Sudoku Tool"),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm"},c.a.createElement(p,{board:this.state.board,onClick:function(t,l){return e.handleClick(t,l)},onMouseDown:function(t,l){return e.handleMouseDown(t,l)},onMouseOver:function(t){return e.handleMouseOver(t)},highlightMatching:this.state.highlightMatching})),c.a.createElement("div",{className:"col-sm"},c.a.createElement(k,{control:this.state.control,onClickVerify:function(){return e.verifyBoard()},onClickUndo:function(){return e.undo()},onClickRedo:function(){return e.redo()},onToggleHighlightRestricted:function(){return e.handleToggleHighlightRestricted()},onToggleHighlightMatchingNumbers:function(){return e.handleToggleHighlightMatchingNumbers()},onToggleAutoCleanUp:function(){return e.handleToggleAutoCleanUp()},onToggleAntiKnight:function(){return e.handleToggleAntiKnight()},onToggleAntiKing:function(){return e.handleToggleAntiKing()}}))))}}]),l}(c.a.Component));u.a.render(c.a.createElement(V,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.f67e0c20.chunk.js.map
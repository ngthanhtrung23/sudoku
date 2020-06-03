(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{23:function(e,t,l){e.exports=l(35)},34:function(e,t,l){},35:function(e,t,l){"use strict";l.r(t);var n=l(11),r=l(5),o=l(6),s=l(9),i=l(8),a=l(0),c=l.n(a),u=l(19),h=l.n(u),d=l(15),g=l.n(d),f=l(7),v=function(e){Object(s.a)(l,e);var t=Object(i.a)(l);function l(){return Object(r.a)(this,l),t.apply(this,arguments)}return Object(o.a)(l,[{key:"renderCellMainValue",value:function(){if(this.props.cell.value)return c.a.createElement("span",{className:"cell-main-value"},this.props.cell.value)}},{key:"renderCellCornerValues",value:function(){if(!this.props.cell.value){var e=Array.from(this.props.cell.cornerValues).sort();return c.a.createElement("span",{className:"cell-corner-value"},e)}}},{key:"renderCellCenterValues",value:function(){if(!this.props.cell.value){var e=Array.from(this.props.cell.centerValues).sort();return c.a.createElement("span",{className:"cell-center-value"},e)}}},{key:"render",value:function(){var e=["cell"];return this.props.cell.isRegionTop()&&e.push("region-top"),this.props.cell.isRegionLeft()&&e.push("region-left"),this.props.cell.isBoardLeft()&&e.push("board-left"),this.props.cell.isBoardRight()&&e.push("board-right"),this.props.cell.isBoardTop()&&e.push("board-top"),this.props.cell.isBoardBottom()&&e.push("board-bottom"),this.props.cell.selected&&e.push("selected"),this.props.cell.restricted&&e.push("restricted"),this.props.cell.error&&e.push("error"),c.a.createElement("div",{className:e.join(" "),onClick:this.props.onClick,key:this.props.cell.id},this.renderCellMainValue(),this.renderCellCornerValues(),this.renderCellCenterValues())}}]),l}(c.a.Component),C=function(e){Object(s.a)(l,e);var t=Object(i.a)(l);function l(){return Object(r.a)(this,l),t.apply(this,arguments)}return Object(o.a)(l,[{key:"renderCell",value:function(e){var t=this;return c.a.createElement(v,{cell:this.props.board.cells[e],onClick:function(l){return t.props.onClick(l,e)},key:e})}},{key:"renderRow",value:function(e){for(var t=[],l=e;l<e+9;l++)t.push(this.renderCell(l));return c.a.createElement("div",{className:"row",key:e},t)}},{key:"render",value:function(){for(var e=[],t=0;t<81;t+=9)e.push(this.renderRow(t));return c.a.createElement("div",null,e)}}]),l}(c.a.Component),y=l(22),p=l(12),k=function(e){Object(s.a)(l,e);var t=Object(i.a)(l);function l(){return Object(r.a)(this,l),t.apply(this,arguments)}return Object(o.a)(l,[{key:"render",value:function(){return c.a.createElement(p.a,null,c.a.createElement(y.a,{onClick:this.props.onClickVerify},"Verify"),c.a.createElement("hr",null),c.a.createElement("h4",null,"Display Options"),c.a.createElement(p.a.Check,{type:"checkbox",id:"checkbox-highlight-restricted",label:"Highlight restricted cells",checked:this.props.control.displayOptions.highlightRestricted,onChange:this.props.onToggleHighlightRestricted}),c.a.createElement("hr",null),c.a.createElement("h4",null,"Game Play"),c.a.createElement(p.a.Check,{type:"checkbox",id:"checkbox-anti-knight",label:"Anti Knight",checked:this.props.control.gamePlay.antiKnight,onChange:this.props.onToggleAntiKnight}),c.a.createElement(p.a.Check,{type:"checkbox",id:"checkbox-anti-king",label:"Anti King",checked:this.props.control.gamePlay.antiKing,onChange:this.props.onToggleAntiKing}))}}]),l}(c.a.Component),b=l(21),m=function(){function e(t){Object(r.a)(this,e),this.value=null,this.cornerValues=new Set,this.centerValues=new Set,this.selected=!1,this.restricted=!1,this.error=!1,this.row=~~(t/9),this.col=t%9,this.id=t}return Object(o.a)(e,[{key:"isRegionTop",value:function(){return this.row%3===0}},{key:"isRegionBottom",value:function(){return this.row%3===2}},{key:"isRegionLeft",value:function(){return this.col%3===0}},{key:"isRegionRight",value:function(){return this.col%3===2}},{key:"isBoardTop",value:function(){return 0===this.row}},{key:"isBoardBottom",value:function(){return 8===this.row}},{key:"isBoardLeft",value:function(){return 0===this.col}},{key:"isBoardRight",value:function(){return 8===this.col}}]),e}(),O=function(){function e(){Object(r.a)(this,e),this.cells=[];for(var t=0;t<81;t++)this.cells.push(new m(t))}return Object(o.a)(e,[{key:"isInside",value:function(e,t){return 0<=e&&e<9&&0<=t&&t<9}},{key:"toCellId",value:function(e,t){return 9*e+t}},{key:"toRowCol",value:function(e){return[~~(e/9),e%9]}},{key:"getRegionByPosition",value:function(e,t){return 3*~~(e/3)+~~(t/3)}},{key:"getRegion",value:function(e){var t=this.toRowCol(e),l=Object(n.a)(t,2),r=l[0],o=l[1];return this.getRegionByPosition(r,o)}},{key:"getVisibleCells",value:function(e,t){for(var l=this.toRowCol(e),r=Object(n.a)(l,2),o=r[0],s=r[1],i=new Set,a=0;a<9;a++)i.add(this.toCellId(o,a));for(var c=0;c<9;c++)i.add(this.toCellId(c,s));for(var u=this.getRegion(e),h=0;h<81;h++)this.getRegion(h)===u&&i.add(h);if(t.antiKnight)for(var d=-2;d<=2;d++)for(var g=-2;g<=2;g++)if(d*d+g*g===5){var f=o+d,v=s+g;this.isInside(f,v)&&i.add(this.toCellId(f,v))}if(t.antiKing)for(var C=-1;C<=1;C++)for(var y=-1;y<=1;y++){var p=o+C,k=s+y;this.isInside(p,k)&&i.add(this.toCellId(p,k))}return i.delete(e),i}},{key:"getInvalidCellIds",value:function(e){for(var t=this,l=new Set,n=function(n){var r=t.cells[n].value;r&&t.getVisibleCells(n,e).forEach((function(e){r===t.cells[e].value&&(l.add(n),l.add(e))}))},r=0;r<81;r++)n(r);return l}},{key:"setSelected",value:function(e){this.cells[e].selected=!0}},{key:"setRestricted",value:function(e){for(var t=this,l=null,n=0;n<81;n++)this.cells[n].selected&&(l=null===l?this.getVisibleCells(n,e):new Set(Object(b.a)(this.getVisibleCells(n,e)).filter((function(e){return l.has(e)}))));l.forEach((function(e){t.cells[e].restricted=!0}))}},{key:"setErrors",value:function(e){var t=this;e.forEach((function(e){t.cells[e].error=!0}))}},{key:"setValueOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.value=e)}))}},{key:"unsetSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&(e.value=null)}))}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.cornerValues.has(e)?t.cornerValues.delete(e):t.cornerValues.add(e))}))}},{key:"clearCornerValuesOfSelectedCells",value:function(){this.cells.forEach((function(e){e.selected&&e.cornerValues.clear()}))}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(t){t.selected&&(t.centerValues.has(e)?t.centerValues.delete(e):t.centerValues.add(e))}))}},{key:"clearCenterValuesOfSelectedCells",value:function(e){this.cells.forEach((function(e){e.selected&&e.centerValues.clear()}))}},{key:"clearAllSelections",value:function(){this.cells.forEach((function(e){e.selected=!1}))}},{key:"clearAllRestricteds",value:function(){this.cells.forEach((function(e){e.restricted=!1}))}},{key:"clearAllErrors",value:function(){this.cells.forEach((function(e){e.error=!1}))}}]),e}(),S=function(){function e(){Object(r.a)(this,e),this.displayOptions={highlightRestricted:!0},this.gamePlay={antiKnight:!1,antiKing:!1}}return Object(o.a)(e,[{key:"toggleHighlightRestricted",value:function(){this.displayOptions.highlightRestricted=!this.displayOptions.highlightRestricted}},{key:"toggleAntiKnight",value:function(){this.gamePlay.antiKnight=!this.gamePlay.antiKnight}},{key:"toggleAntiKing",value:function(){this.gamePlay.antiKing=!this.gamePlay.antiKing}}]),e}(),V=(l(33),l(34),function(e){Object(s.a)(l,e);var t=Object(i.a)(l);function l(e){var n;return Object(r.a)(this,l),(n=t.call(this,e)).state={board:new O,control:new S},n}return Object(o.a)(l,[{key:"cloneBoard",value:function(){return g.a.clone(this.state.board,!0)}},{key:"cloneControl",value:function(){return g.a.clone(this.state.control,!0)}},{key:"assignNewBoard",value:function(e){this.setState({board:e,control:this.state.control})}},{key:"assignNewControl",value:function(e){this.setState({board:this.state.board,control:e})}},{key:"clearSelectionAndRestricted",value:function(){console.log("clearSelectionAndRestricted");var e=this.cloneBoard();e.clearAllSelections(),e.clearAllRestricteds(),this.assignNewBoard(e)}},{key:"select",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];console.log("select "+e);var l=this.cloneBoard();t?this.clearSelectionAndRestricted():l.clearAllRestricteds(),l.setSelected(e),this.state.control.displayOptions.highlightRestricted&&l.setRestricted(this.state.control.gamePlay),this.assignNewBoard(l)}},{key:"handleClick",value:function(e,t){console.log("handleClick "+t),this.select(t,!e.metaKey)}},{key:"setValueOfSelectedCells",value:function(e){console.log("setValueOfSelectedCells "+e),this.clearAllError();var t=this.cloneBoard();t.setValueOfSelectedCells(e),this.assignNewBoard(t)}},{key:"unsetSelectedCells",value:function(){console.log("unsetSelectedCells"),this.clearAllError();var e=this.cloneBoard();e.unsetSelectedCells(),this.assignNewBoard(e)}},{key:"toggleCornerValuesOfSelectedCells",value:function(e){console.log("toggleCornerValuesOfSelectedCells "+e);var t=this.cloneBoard();t.toggleCornerValuesOfSelectedCells(e),this.assignNewBoard(t)}},{key:"clearCornerValuesOfSelectedCells",value:function(){console.log("clearCornerValuesOfSelectedCells");var e=this.cloneBoard();e.clearCornerValuesOfSelectedCells(),this.assignNewBoard(e)}},{key:"toggleCenterValuesOfSelectedCells",value:function(e){console.log("toggleCenterValuesOfSelectedCells "+e);var t=this.cloneBoard();t.toggleCenterValuesOfSelectedCells(e),this.assignNewBoard(t)}},{key:"clearCenterValuesOfSelectedCells",value:function(){console.log("clearCenterValuesOfSelectedCells");var e=this.cloneBoard();e.clearCenterValuesOfSelectedCells(),this.assignNewBoard(e)}},{key:"clearAllError",value:function(){console.log("clearAllError");var e=this.cloneBoard();e.clearAllErrors(),this.assignNewBoard(e)}},{key:"verifyBoard",value:function(){console.log("verifyBoard");var e=this.cloneBoard();e.clearAllErrors();var t=e.getInvalidCellIds(this.state.control.gamePlay);e.setErrors(t),this.assignNewBoard(e),alert(t.size>0?"Error found :(":"LGTM!")}},{key:"moveSelection",value:function(e,t){for(var l=0,r=0,o=0;o<81;o++)if(this.state.board.cells[o].selected){console.log(this.state);var s=this.state.board.toRowCol(o),i=Object(n.a)(s,2);l=i[0],r=i[1];break}l=(l+e+9)%9,r=(r+t+9)%9,this.select(this.state.board.toCellId(l,r))}},{key:"handleKeyDown",value:function(e){console.log("handleKeyDown, keyCode = "+e.keyCode);var t=!!e.shiftKey,l=!!e.metaKey;if(e.keyCode>=f.a&&e.keyCode<=f.b){var n=String.fromCharCode(e.keyCode);t?this.toggleCornerValuesOfSelectedCells(n):l?(this.toggleCenterValuesOfSelectedCells(n),e.preventDefault()):this.setValueOfSelectedCells(n)}switch(e.keyCode){case f.h:this.unsetSelectedCells();break;case f.c:this.unsetSelectedCells(),this.clearCornerValuesOfSelectedCells(),this.clearCenterValuesOfSelectedCells(),e.preventDefault();break;case f.d:this.moveSelection(1,0);break;case f.i:this.moveSelection(-1,0);break;case f.f:this.moveSelection(0,-1);break;case f.g:this.moveSelection(0,1);break;case f.e:this.clearSelectionAndRestricted()}}},{key:"handleToggleHighlightRestricted",value:function(){console.log("handleToggleHighlightRestricted");var e=this.cloneControl();e.toggleHighlightRestricted(),this.assignNewControl(e)}},{key:"handleToggleAntiKnight",value:function(){console.log("handleToggleAntiKnight");var e=this.cloneControl();e.toggleAntiKnight(),this.assignNewControl(e)}},{key:"handleToggleAntiKing",value:function(){console.log("handleToggleAntiKing");var e=this.cloneControl();e.toggleAntiKing(),this.assignNewControl(e)}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{onKeyDown:function(t){return e.handleKeyDown(t)},tabIndex:"0",className:"container"},c.a.createElement("h1",null,"Sudoku Tool"),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm"},c.a.createElement(C,{board:this.state.board,onClick:function(t,l){return e.handleClick(t,l)}})),c.a.createElement("div",{className:"col-sm"},c.a.createElement(k,{control:this.state.control,onClickVerify:function(){return e.verifyBoard()},onToggleHighlightRestricted:function(){return e.handleToggleHighlightRestricted()},onToggleAntiKnight:function(){return e.handleToggleAntiKnight()},onToggleAntiKing:function(){return e.handleToggleAntiKing()}}))))}}]),l}(c.a.Component));h.a.render(c.a.createElement(V,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.137e9047.chunk.js.map
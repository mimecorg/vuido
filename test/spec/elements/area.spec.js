const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { Area, AreaGroup, AreaPath, AreaText, Button } = require( 'libui-node-dom' );

describe( 'Area', () => {
  it( 'constructor', () => {
    const area = new Area( 'Area' );

    expect( area.parentNode ).to.be.null;
    expect( area.prevSibling ).to.be.null;
    expect( area.nextSibling ).to.be.null;
    expect( area.tagName ).to.equal( 'Area' );
    expect( area.childNodes ).to.be.an( 'array' ).that.is.empty;
    expect( area.attributes ).to.deep.equal( {
      visible: true,
      enabled: true,
      stretchy: false,
      label: '',
      scrollable: false,
      width: 0,
      height: 0
    } );
    expect( area.handlers ).to.be.an( 'object' ).that.is.empty;
    expect( area.widget ).to.be.null;
  } );

  describe( '_mountWidget', () => {
    it( 'default', () => {
      const area = new Area( 'Area' );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( area.widget ).to.be.an.instanceof( libui.UiArea );

      expect( libui.UiArea ).to.have.been.calledWithNew.and.calledWithExactly( sinon.match.func, sinon.match.func, sinon.match.func, sinon.match.func, sinon.match.func );
    } );

    it( 'with attributes', () => {
      const area = new Area( 'Area' );

      area.setAttribute( 'scrollable', true );
      area.setAttribute( 'width', 800 );
      area.setAttribute( 'height', 600 );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWithNew.and.calledWithExactly( sinon.match.func, sinon.match.func, sinon.match.func, sinon.match.func, sinon.match.func, 800, 600 );
    } );

    it( 'with draw event listener', () => {
      const area = new Area( 'Area' );
      const handler = sinon.stub();

      area.addEventListener( 'draw', handler );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match( callback => {
        const params = {};
        callback( area, params );
        expect( handler ).to.have.been.calledWith( params );
        return true;
      } ) );
    } );

    it( 'with mouse event listener', () => {
      const area = new Area( 'Area' );
      const downHandler = sinon.stub();
      const upHandler = sinon.stub();
      const moveHandler = sinon.stub();

      area.addEventListener( 'mousedown', downHandler );
      area.addEventListener( 'mouseup', upHandler );
      area.addEventListener( 'mousemove', moveHandler );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match.func, sinon.match( callback => {
        const downEvent = { getUp() { return 0; }, getDown() { return 1; } };
        callback( area, downEvent );
        expect( downHandler ).to.have.been.calledWith( downEvent );

        const upEvent = { getUp() { return 1; }, getDown() { return 0; } };
        callback( area, upEvent );
        expect( upHandler ).to.have.been.calledWith( upEvent );

        const moveEvent = { getUp() { return 0; }, getDown() { return 0; } };
        callback( area, moveEvent );
        expect( moveHandler ).to.have.been.calledWith( moveEvent );

        return true;
      } ) );
    } );

    it( 'with mouse crossed event listener', () => {
      const area = new Area( 'Area' );
      const enterHandler = sinon.stub();
      const leaveHandler = sinon.stub();

      area.addEventListener( 'mouseenter', enterHandler );
      area.addEventListener( 'mouseleave', leaveHandler );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match.func, sinon.match.func, sinon.match( callback => {
        callback( area, false );
        expect( enterHandler ).to.have.been.called;

        callback( area, true );
        expect( leaveHandler ).to.have.been.called;

        return true;
      } ) );
    } );

    it( 'with drag broken event listener', () => {
      const area = new Area( 'Area' );
      const handler = sinon.stub();

      area.addEventListener( 'dragbroken', handler );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match.func, sinon.match.func, sinon.match.func, sinon.match( callback => {
        callback( area );
        expect( handler ).to.have.been.called;
        return true;
      } ) );
    } );

    it( 'with key event listener', () => {
      const area = new Area( 'Area' );
      const downHandler = sinon.stub();
      const upHandler = sinon.stub();

      area.addEventListener( 'keydown', downHandler );
      area.addEventListener( 'keyup', upHandler );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match.func, sinon.match.func, sinon.match.func, sinon.match.func, sinon.match( callback => {
        const downEvent = { getUp() { return false; } };
        callback( area, downEvent );
        expect( downHandler ).to.have.been.calledWith( downEvent );

        const upEvent = { getUp() { return true; } };
        callback( area, upEvent );
        expect( upHandler ).to.have.been.calledWith( upEvent );

        return true;
      } ) );
    } );

    it( 'with child AreaPath', () => {
      const area = new Area( 'Area' );
      const areaPath = new AreaPath( 'AreaPath' );

      const path = {};
      const fill = {};
      const stroke = {};

      area.appendChild( areaPath );
      areaPath.setAttribute( 'path', path );
      areaPath.setAttribute( 'fill', fill );
      areaPath.setAttribute( 'stroke', stroke );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match( callback => {
        const context = { fill: sinon.stub(), stroke: sinon.stub() };
        const params = { getContext() { return context; } };
        callback( area, params );
        expect( context.fill ).to.have.been.calledWith( path, fill );
        expect( context.stroke ).to.have.been.calledWith( path, stroke, sinon.match( line => {
          expect( line.thickness ).to.equal( 1 );
          return true;
        } ) );
        return true;
      } ) );
    } );

    it( 'with child AreaText', () => {
      const area = new Area( 'Area' );
      const areaText = new AreaText( 'AreaText' );

      const layout = {};

      area.appendChild( areaText );
      areaText.setAttribute( 'x', 100 );
      areaText.setAttribute( 'y', 50 );
      areaText.setAttribute( 'layout', layout );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match( callback => {
        const context = { text: sinon.stub() };
        const params = { getContext() { return context; } };
        callback( area, params );
        expect( context.text ).to.have.been.calledWith( 100, 50, layout );
        return true;
      } ) );
    } );

    it( 'with child AreaGroup', () => {
      const area = new Area( 'Area' );
      const areaGroup = new AreaGroup( 'AreaGroup' );
      const areaPath1 = new AreaPath( 'AreaPath' );
      const areaPath2 = new AreaPath( 'AreaPath' );

      const transform = {};
      const path1 = {};
      const fill1 = {};
      const stroke1 = {};
      const line1 = {};
      const path2 = {};
      const fill2 = {};
      const stroke2 = {};
      const line2 = {};

      area.appendChild( areaGroup );
      areaGroup.setAttribute( 'transform', transform );
      areaGroup.setAttribute( 'fill', fill1 );
      areaGroup.setAttribute( 'stroke', stroke1 );
      areaGroup.setAttribute( 'line', line1 );

      areaGroup.appendChild( areaPath1 );
      areaPath1.setAttribute( 'path', path1 );

      areaGroup.appendChild( areaPath2 );
      areaPath2.setAttribute( 'path', path2 );
      areaPath2.setAttribute( 'fill', fill2 );
      areaPath2.setAttribute( 'stroke', stroke2 );
      areaPath2.setAttribute( 'line', line2 );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match( callback => {
        const context = { fill: sinon.stub(), stroke: sinon.stub(), save: sinon.stub(), transform: sinon.stub(), restore: sinon.stub() };
        const params = { getContext() { return context; } };
        callback( area, params );
        expect( context.save ).to.have.been.called;
        expect( context.transform ).to.have.been.calledImmediatelyAfter( context.save ).and.calledWith( transform );
        expect( context.fill ).to.have.been.calledAfter( context.transform ).and.calledBefore( context.restore )
          .and.calledWith( path1, fill1 ).and.calledWith( path2, fill2 );
        expect( context.stroke ).to.have.been.calledAfter( context.transform ).and.calledBefore( context.restore )
          .and.calledWith( path1, stroke1, line1 ).and.calledWith( path2, stroke2, line2 );
        expect( context.restore ).to.have.been.called;
        return true;
      } ) );
    } );

    it( 'with child widget fails', () => {
      const area = new Area( 'Area' );
      const button = new Button( 'Button' );

      area.appendChild( button );

      expect( () => area._mountWidget() ).to.throw();
    } );
  } );

  describe( 'modify after _mountWidget', () => {
    it( 'setAttribute', () => {
      const area = new Area( 'Area' );

      area.setAttribute( 'scrollable', true );
      area.setAttribute( 'width', 800 );
      area.setAttribute( 'height', 600 );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'setSize' );

      area.setAttribute( 'width', 1600 );
      area.setAttribute( 'height', 1200 );

      expect( libui.UiArea.prototype.setSize ).to.have.been.calledWith( 1600, 1200 );
    } );

    it( 'addEventListener', () => {
      const area = new Area( 'Area' );
      const handler = sinon.stub();

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      let drawCallback = null;

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match( callback => {
        drawCallback = callback;
        return true;
      } ) );

      area.addEventListener( 'draw', handler );

      const params = {};
      drawCallback( area, params );

      expect( handler ).to.have.been.calledWith( params );
    } );

    it( 'removeEventListener', () => {
      const area = new Area( 'Area' );
      const handler = sinon.stub();

      area.addEventListener( 'draw', handler );

      sinon.spy( libui, 'UiArea' );

      area._mountWidget();

      let drawCallback = null;

      expect( libui.UiArea ).to.have.been.calledWith( sinon.match( callback => {
        drawCallback = callback;
        return true;
      } ) );

      area.removeEventListener( 'draw' );

      const params = {};
      drawCallback( area, params );

      expect( handler ).to.have.not.been.called;
    } );

    it( 'appendChild', () => {
      const area = new Area( 'Area' );
      const areaPath = new AreaPath( 'AreaPath' );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      area.appendChild( areaPath );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'insertChild', () => {
      const area = new Area( 'Area' );
      const areaPath1 = new AreaPath( 'AreaPath' );
      const areaPath2 = new AreaPath( 'AreaPath' );

      area.appendChild( areaPath1 );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      area.insertBefore( areaPath2, areaPath1 );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'removeChild', () => {
      const area = new Area( 'Area' );
      const areaPath = new AreaPath( 'AreaPath' );

      area.appendChild( areaPath );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      area.removeChild( areaPath );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'setAttribute on AreaPath', () => {
      const area = new Area( 'Area' );
      const areaPath = new AreaPath( 'AreaPath' );

      area.appendChild( areaPath );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      areaPath.setAttribute( 'path', {} );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'setAttribute on AreaText', () => {
      const area = new Area( 'Area' );
      const areaText = new AreaText( 'AreaText' );

      area.appendChild( areaText );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      areaText.setAttribute( 'layout', {} );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'setAttribute on AreaGroup', () => {
      const area = new Area( 'Area' );
      const areaGroup = new AreaGroup( 'AreaGroup' );

      area.appendChild( areaGroup );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      areaGroup.setAttribute( 'fill', {} );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'appendChild on AreaGroup', () => {
      const area = new Area( 'Area' );
      const areaGroup = new AreaGroup( 'AreaGroup' );
      const areaPath = new AreaPath( 'AreaPath' );

      area.appendChild( areaGroup );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      areaGroup.appendChild( areaPath );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'insertChild on AreaGroup', () => {
      const area = new Area( 'Area' );
      const areaGroup = new AreaGroup( 'AreaGroup' );
      const areaPath1 = new AreaPath( 'AreaPath' );
      const areaPath2 = new AreaPath( 'AreaPath' );

      area.appendChild( areaGroup );
      areaGroup.appendChild( areaPath1 );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      areaGroup.insertBefore( areaPath2, areaPath1 );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'removeChild on AreaGroup', () => {
      const area = new Area( 'Area' );
      const areaGroup = new AreaGroup( 'AreaGroup' );
      const areaPath = new AreaPath( 'AreaPath' );

      area.appendChild( areaGroup );
      areaGroup.appendChild( areaPath );

      area._mountWidget();

      sinon.spy( libui.UiArea.prototype, 'queueRedrawAll' );

      areaGroup.removeChild( areaPath );

      expect( libui.UiArea.prototype.queueRedrawAll ).to.have.been.calledOn( area.widget );
    } );

    it( 'appendChild widget on AreaGroup fails', () => {
      const area = new Area( 'Area' );
      const areaGroup = new AreaGroup( 'AreaGroup' );
      const button = new Button( 'Button' );

      area.appendChild( areaGroup );

      area._mountWidget();

      expect( () => areaGroup.appendChild( button ) ).to.throw();
    } );
  } );
} );

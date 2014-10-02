// Written by Jürgen Moßgraber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

TransportProxy.INC_FRACTION_TIME      = 1.0;        // 1 beat
TransportProxy.INC_FRACTION_TIME_SLOW = 1.0 / 20;   // 1/20th of a beat
TransportProxy.TEMPO_MIN              = 20;
TransportProxy.TEMPO_MAX              = 666;

function TransportProxy ()
{
    this.transport = host.createTransport ();

    this.isClickOn         = false;
    this.isPlaying         = false;
    this.isRecording       = false;
    this.isLooping         = false;
    this.isLauncherOverdub = false;
    this.crossfade         = 0;
    this.numerator         = 4;
    this.denominator       = 4;
    
    this.transport.addClickObserver (doObject (this, TransportProxy.prototype.handleClick));
    this.transport.addIsPlayingObserver (doObject (this, TransportProxy.prototype.handleIsPlaying));
    this.transport.addIsRecordingObserver (doObject (this, TransportProxy.prototype.handleIsRecording));
    this.transport.addIsLoopActiveObserver (doObject (this, TransportProxy.prototype.handleIsLoopActive));
    this.transport.addLauncherOverdubObserver (doObject (this, TransportProxy.prototype.handleLauncherOverdub));
    this.transport.getTempo ().addRawValueObserver (doObject (this, TransportProxy.prototype.handleTempo));
    this.transport.getCrossfade ().addValueObserver (Config.maxParameterValue, doObject (this, TransportProxy.prototype.handleCrossfade));

    var ts = this.transport.getTimeSignature ();
    ts.getNumerator ().addValueObserver (doObject (this, TransportProxy.prototype.handleNumerator));
    ts.getDenominator ().addValueObserver (doObject (this, TransportProxy.prototype.handleDenominator));
}

TransportProxy.prototype.fastForward = function ()
{
    this.transport.fastForward ();
};

TransportProxy.prototype.getInPosition = function ()
{
    return this.transport.getInPosition ();
};

TransportProxy.prototype.getOutPosition = function ()
{
    return this.transport.getOutPosition ();
};

TransportProxy.prototype.getPosition = function ()
{
    return this.transport.getPosition ();
};

TransportProxy.prototype.incPosition = function (deltaBase, snap)
{
    this.transport.incPosition (deltaBase, snap);
};

TransportProxy.prototype.play = function ()
{
    this.transport.play ();
};

TransportProxy.prototype.record = function ()
{
    this.transport.record ();
};

TransportProxy.prototype.resetAutomationOverrides = function ()
{
    this.transport.resetAutomationOverrides ();
};

TransportProxy.prototype.restart = function ()
{
    this.transport.restart ();
};

TransportProxy.prototype.returnToArrangement = function ()
{
    this.transport.returnToArrangement ();
};

TransportProxy.prototype.rewind = function ()
{
    this.transport.rewind ();
};

TransportProxy.prototype.setAutomationWriteMode = function (mode)
{
    this.transport.setAutomationWriteMode (mode);
};

TransportProxy.prototype.setClick = function (on)
{
    this.transport.setClick (on);
};

TransportProxy.prototype.setLauncherOverdub = function (on)
{
    this.transport.setLauncherOverdub (on);
};

TransportProxy.prototype.setLoop = function (on)
{
    this.transport.setLoop (on);
};

TransportProxy.prototype.setMetronomeValue = function (amount, range)
{
    this.transport.setMetronomeValue (amount, range);
};

TransportProxy.prototype.setOverdub = function (on)
{
    this.transport.setOverdub (on);
};

TransportProxy.prototype.setPosition = function (beats)
{
    this.transport.setPosition (beats);
};

TransportProxy.prototype.stop = function ()
{
    this.transport.stop ();
};

TransportProxy.prototype.toggleClick = function ()
{
    this.transport.toggleClick ();
};

TransportProxy.prototype.toggleLatchAutomationWriteMode = function ()
{
    this.transport.toggleLatchAutomationWriteMode ();
};

TransportProxy.prototype.toggleLauncherOverdub = function ()
{
    this.transport.toggleLauncherOverdub ();
};

TransportProxy.prototype.toggleLoop = function ()
{
    this.transport.toggleLoop ();
};

TransportProxy.prototype.toggleMetronomeTicks = function ()
{
    this.transport.toggleMetronomeTicks ();
};

TransportProxy.prototype.toggleOverdub = function ()
{
    this.transport.toggleOverdub ();
};

TransportProxy.prototype.togglePlay = function ()
{
    this.transport.togglePlay ();
};

TransportProxy.prototype.togglePunchIn = function ()
{
    this.transport.togglePunchIn ();
};

TransportProxy.prototype.togglePunchOut = function ()
{
    this.transport.togglePunchOut ();
};

TransportProxy.prototype.toggleWriteArrangerAutomation = function ()
{
    this.transport.toggleWriteArrangerAutomation ();
};

TransportProxy.prototype.toggleWriteClipLauncherAutomation = function ()
{
    this.transport.toggleWriteClipLauncherAutomation ();
};

TransportProxy.prototype.stopAndRewind = function ()
{
    this.transport.stop ();
    this.transport.setPosition (0);
};

TransportProxy.prototype.changePosition = function (increase, slow)
{
    var frac = slow ? TransportProxy.INC_FRACTION_TIME_SLOW : TransportProxy.INC_FRACTION_TIME;
    this.transport.incPosition (increase ? frac : -frac, false);
};

TransportProxy.prototype.tapTempo = function ()
{
    this.transport.tapTempo ();
};

TransportProxy.prototype.changeTempo = function (increase, fine)
{
    var offset = fine ? 0.01 : 1;
    this.tempo = increase ? Math.min (this.tempo + offset, TransportProxy.TEMPO_MAX) : Math.max (TransportProxy.TEMPO_MIN, this.tempo - offset);
    this.transport.getTempo ().setRaw (this.tempo);
};

TransportProxy.prototype.setTempo = function (bpm)
{
    this.transport.getTempo ().setRaw (bpm);
};

// in bpm
TransportProxy.prototype.getTempo = function ()
{
    return this.tempo;
};

TransportProxy.prototype.setTempoIndication = function (isTouched)
{
    this.transport.getTempo ().setIndication (isTouched);
};

TransportProxy.prototype.setCrossfade = function (value)
{
    this.transport.getCrossfade ().set (value, Config.maxParameterValue);
};

TransportProxy.prototype.getCrossfade = function ()
{
    return this.crossfade;
};

TransportProxy.prototype.setLauncherOverdub = function (on)
{
    // Note: This is a bug: On and off are switched
    this.transport.setLauncherOverdub (!on);
};

TransportProxy.prototype.getNumerator = function ()
{
    return this.numerator;
};

TransportProxy.prototype.getDenominator = function ()
{
    return this.denominator;
};

//--------------------------------------
// Callback Handlers
//--------------------------------------

TransportProxy.prototype.handleClick = function (isOn)
{
    this.isClickOn = isOn;
};

TransportProxy.prototype.handleIsPlaying = function (isPlaying)
{
    this.isPlaying = isPlaying;
};

TransportProxy.prototype.handleIsRecording = function (isRec)
{
    this.isRecording = isRec;
};

TransportProxy.prototype.handleIsLoopActive = function (isLoop)
{
    this.isLooping = isLoop;
};

TransportProxy.prototype.handleLauncherOverdub = function (isOverdub)
{
    this.isLauncherOverdub = isOverdub;
};

TransportProxy.prototype.handleTempo = function (value)
{
    this.tempo = Math.min (TransportProxy.TEMPO_MAX, Math.max (TransportProxy.TEMPO_MIN, value));
};

TransportProxy.prototype.handleCrossfade = function (value)
{
    this.crossfade = value;
};

TransportProxy.prototype.handleNumerator = function (value)
{
    this.numerator = value;
};

TransportProxy.prototype.handleDenominator = function (value)
{
    this.denominator = value;
};
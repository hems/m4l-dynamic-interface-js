autowatch = 1;

// saving global state here
var state = {
    multiSliders: []
}

var settings = {
    // x offset ( where all ugly menu is baked)
    offset: {
        x: 330
    },
    // dimensions for multislider
    dimensions: {
        width: 200,
        height: 150
    }
}

function createMultiSlider(numberOfSliders) {
    // default value for numberOfSliders will be 10 
    numberOfSliders = numberOfSliders || 10

    // if we receive negative numbers we set it to 1
    numberOfSliders = Math.max(1, numberOfSliders)

    // we take the index by using the array's length
    var index = state.multiSliders.length
    var name = 'multislider_' + index

    var maxObject = patcher.newdefault(0, 0, "multislider")

    maxObject.varname = name
    maxObject.sendbox('presentation', 1)
    maxObject.size(numberOfSliders);

    // listen to value changes on the UI and update global state accordingly
    var listener = new MaxobjListener(maxObject, function (data) {
        // when reducing the amount of sliders between presets
        // this event fires but the UI object doesn't exist anymore
        // then we must ignore this event to avoid errors
        if (!state.multiSliders[index]) {
            post("\n")
            post("!!!!! state.multiSliders[index] doesn't exist for index: ", index)
            post("\n")
            return
        }

        state.multiSliders[index].values = data.value
    });

    function updatePosition(position) {
        maxObject.sendbox('presentation_rect', [
            position.x, position.y,
            settings.dimensions.width, settings.dimensions.height
        ])

        maxObject.sendbox('patching_rect', [
            position.x, position.y,
            settings.dimensions.width, settings.dimensions.height
        ])
    }

    function getValueOf() {
        var position = {
            x: maxObject.getattr('presentation_rect')[0],
            y: maxObject.getattr('presentation_rect')[1],
        }

        var values = state.multiSliders[index].values

        return {
            position: position,
            values: values
        }
    }

    function loadFromDict(state) {
        updatePosition(state.position);

        if (state.values) {
            maxObject.size(state.values.length)
            maxObject.message("setlist", state.values);
        }

    }

    function destroy() {
        patcher.remove(maxObject);
    }

    // create object and store in state
    const multiSlider = {
        maxObject: maxObject,
        // values will be populated only if the user interacts with the 
        // multiSlider
        values: null,
        destroy: destroy,
        loadFromDict: loadFromDict,
        getValueOf: getValueOf,
        setRect: updatePosition
    }

    state.multiSliders.push(multiSlider)

    const position = {
        x: settings.offset.x + (settings.dimensions.width + 10) * index,
        y: 10
    }

    updatePosition(position)

    updateMaxForLiveWidth();

    return multiSlider
}

function removeMultiSliders() {
    for (var index in state.multiSliders) {
        state.multiSliders[index].destroy()
    }

    state.multiSliders = []

    updateMaxForLiveWidth();
}

// called by the "pattr" object
function getvalueof() {
    post("\n")
    post("getvalueof called")
    post("\n")

    var json = {
        multiSliders: []
    }

    for (var index in state.multiSliders) {
        var multiSlider = state.multiSliders[index]

        json.multiSliders.push(multiSlider.getValueOf())
    }

    // posts the entire state as json
    // post("\n")
    // post("return state:", JSON.stringify(json, null, 2))
    // post("\n")

    // create Dict for max
    var dict = new Dict()
    dict.set('multiSliders', JSON.stringify(json.multiSliders))

    return dict;
}

function setvalueof(dict) {
    post("\n")
    post("setvalueof called")
    post("\n")

    if(!dict) {
        post("\n")
        post("!!!!! setvalueof called with undefined dict, very weird!", dict)
        post("\n")
        return
    }

    if(!dict.get) {
        post("\n")
        post("!!!!! setvalueof called with undefined dict.get, very weird!", dict)
        post("\n")
        return
    }

    var multiSliders = JSON.parse(dict.get('multiSliders'))

    // always rebuild the UI even if same amount of items
    removeMultiSliders();

    for (var index in multiSliders) {
        var numberOfSliders = null;

        if(multiSliders[index].values){
            numberOfSliders = multiSliders[index].values.length;
        }

        var multiSlider = createMultiSlider(numberOfSliders)

        multiSlider.loadFromDict(multiSliders[index])
    }

    updateMaxForLiveWidth();
}

function updateMaxForLiveWidth() {
    var live = patcher.getnamed('live-this-device')

    var numberOfSliders = state.multiSliders.length

    var width = 
        settings.offset.x + (settings.dimensions.width + 10) * numberOfSliders

    live.setwidth(width)    
}


// post the entire state to the log window so we can see what's
// currently stored on our global variable "state"
function dumpState() {
    post("\n")
    post("state:", JSON.stringify(state, null, 2))
    post("\n")
}
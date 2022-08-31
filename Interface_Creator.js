autowatch = 1;

function MultiSlider(index, p, pos, numberOfSliders)
{   
    this.index = index;
    this.p = p; // this.patcher
    this.pos = pos;
    this.nos = numberOfSliders;
    this.size = [200, 60];

    this.values = [];

    for (var i=0; i<numberOfSliders; i++)
    {
        this.values.push(0);
    }

    this.multislider_maxobj = this.p.newdefault(0,0,"multislider");
    this.multislider_maxobj.varname = "multislider_";
    this.p.script("sendbox", this.multislider_maxobj.varname, "patching_rect", 
                  this.pos[0], this.pos[1], this.size[0], this.size[1]);

    this.multislider_maxobj.size(this.nos);

    var SliderCallback = (function(data) 
    {
        this.values = data.value;
    }).bind(this);

    this.objListener = new MaxobjListener(this.multislider_maxobj, SliderCallback);

    this.SetRect = function(pos)
    {   
        this.pos = pos;
        this.p.script("sendbox", this.multislider_maxobj.varname, "patching_rect", 
                      pos[0], pos[1], this.size[0], this.size[1]);
    }

    this.SaveToDict = function(saveDict)
    {
        saveDict.replace("multislider_"+this.index+"_pos", JSON.stringify(this.pos));
        saveDict.replace("multislider_"+this.index+"_values", JSON.stringify(this.values));
    }

    this.LoadFromDict = function(dict)
    {
        var pos = JSON.parse(dict.get("multislider_"+this.index+"_pos"));
        var values = JSON.parse(dict.get("multislider_"+this.index+"_values"));
        this.SetRect(pos);

        this.values = values;
        this.multislider_maxobj.message("setlist", values);
    }

    this.Destroy = function()
    {
        this.p.remove(this.multislider_maxobj);
    }
}

var g_multisliderArray = [];
var g_numberOfMultisliders = 0;

// Public Functions 
function create_multislider(posX, posY)
{
    g_multisliderArray.push(new MultiSlider(g_numberOfMultisliders, this.patcher, [posX, posY], 10));
    g_numberOfMultisliders++;
}

function delete_ui()
{
    for (var index in g_multisliderArray)
    {
        g_multisliderArray[index].Destroy();
    }
    g_multisliderArray = [];
    g_numberOfMultisliders = 0;
}

// AUTOMATICALLY CALLED BY MAX WITH THE PATTR OBJECT
function getvalueof()
{
    var saveDict = new Dict();

    for (var index in g_multisliderArray)
    {
        g_multisliderArray[index].SaveToDict(saveDict);
    }
    saveDict.replace("number_of_sliders", JSON.stringify(g_numberOfMultisliders));

    return saveDict;
}

function setvalueof(dict)
{       
    var numbOfSliders = JSON.parse(dict.get("number_of_sliders"));

    if (g_multisliderArray.length != numbOfSliders) {
        delete_ui();
        for (var i=0; i<numbOfSliders; i++)
        {   
            g_multisliderArray.push(new MultiSlider(g_numberOfMultisliders, this.patcher, [0, 0], 10));
            g_numberOfMultisliders++;
        }
    }

    // SET THE POSITION FROM THE DICT FOR EACH MULTISLIDER
    for (var index in g_multisliderArray)
    {
        g_multisliderArray[index].LoadFromDict(dict);
    }
}
const w=window,d=document,h=d.getElementsByTagName('html')[0];
var isDirtyForm = false;

/**
 * @name                        availableMethods 
 * @type                        {Object}
 *  
 * @description                 Contains all the available OSX Methods that one would rationally attempt to bind to a directional
 *                              key, categorized into primary directions:
 *                               - LU (Left/Up) or "towards the start of the line or document from the current cursor position"
 *                               - RD (Right/Down) or "toward the end of the line or document from the current cursor position"
 *                              ...and further sub-categorized into the respective components of each: "left" & "up" in LU, etc.
 */
const availableMethods = {
    'LU': {
        'L': ['moveLeft', 'moveLeftAndModifySelection', 'moveWordLeft', 'moveWordLeftAndModifySelection', 'moveToBeginningOfLine', 'moveToBeginningOfLineAndModifySelection'],
        'U': ['moveUp', 'moveUpAndModifySelection', 'pageUp', 'pageUpAndModifySelection', 'moveToBeginningOfParagraph', 'moveToBeginningOfParagraphAndModifySelection', 'moveToBeginningOfDocument', 'moveToBeginningOfDocumentAndModifySelection']
    },
    'RD': {
        'R': ['moveRight', 'moveRightAndModifySelection', 'moveWordRight', 'moveWordRightAndModifySelection', 'moveToEndOfLine', 'moveToEndOfLineAndModifySelection'],
        'D': ['moveDown', 'moveDownAndModifySelection', 'pageDown', 'pageDownAndModifySelection', 'moveToEndOfParagraph', 'moveToEndOfParagraphAndModifySelection', 'moveToEndOfDocument', 'moveToEndOfDocumentAndModifySelection']
    }
};

/**
 * @name                        systemDefaults
 * @type                        {Object}
 * 
 * @description                 This is really the guts of the data store. Listed below are all the NATIVE key combinations 
 *                              indemic to OSX. It could just as easily by a DB. This allows us to do several important things:
 *                              1. Restore Defaults.
 *                              2. Ascertain currently "taken" key combinations (useful if use specifies a combo already in use)
 *                              3. Ascertain if a given listing is still resting in "default mode"
 *                              4. In conjunction with #3, how we can HIDE the defaults
 *                              5. It also provides the rough shape of a data storage format, should I later decide to 
 *                                 incorporate a useful TODO: Store a stripped-down version of this object to 
 *                                 localStorage to restore on pageLoad
 */
const systemDefaults = {
    'LU': {
        'L': {
            'LEFT_ARROW': {
                'keySymbol': '←',
                'keyCode':'UF702',
                'data': [
                    { 'keyCode': '\UF702', 'hfDesc': 'LEFTARROW', 'osxCmd': 'moveLeft' },
                    { 'keyCode': '$\UF702', 'hfDesc': 'SHIFT + LEFTARROW', 'osxCmd': 'moveLeftAndModifySelection' },
                    { 'keyCode': '@\UF702', 'hfDesc': 'CMD + LEFTARROW', 'osxCmd': 'moveToBeginningOfLine' },
                    { 'keyCode': '~\UF702', 'hfDesc': 'ALT + LEFTARROW', 'osxCmd': 'moveWordLeft' },
                    { 'keyCode': '$@\UF702', 'hfDesc': 'SHIFT + CMD + LEFTARROW', 'osxCmd': 'moveToBeginningOfLineAndModifySelection' },
                    { 'keyCode': '$~\UF702', 'hfDesc': 'SHIFT + ALT + LEFTARROW', 'osxCmd': 'moveWordLeftAndModifySelection' }
                ]
            }
        },
        'U': {
            'UP_ARROW': {
                'keySymbol': '↑',
                'keyCode':'UF700',
                'data': [
                    { 'keyCode': '\UF700', 'hfDesc': 'UPARROW', 'osxCmd': 'moveUp' },
                    { 'keyCode': '$\UF700', 'hfDesc': 'SHIFT + UPARROW', 'osxCmd': 'moveUpAndModifySelection' },
                    { 'keyCode': '~\UF700', 'hfDesc': 'ALT + UPARROW', 'osxCmd': 'moveToBeginningOfParagraph' },
                    { 'keyCode': '$~\UF700', 'hfDesc': 'SHIFT + ALT + UPARROW', 'osxCmd': 'moveToBeginningOfParagraphAndModifySelection' }
                ]
            },
            'PAGE_UP': {
                'keySymbol': '⇞',
                'keyCode':'UF72C',
                'data': [
                    { 'keyCode': '\UF72C', 'hfDesc': 'PGUP', 'osxCmd': 'pageUp' },
                    { 'keyCode': '$\UF72C', 'hfDesc': 'SHIFT + PGUP', 'osxCmd': 'pageUpAndModifySelection' },
                ]
            },
            'HOME': {
                'keySymbol': '⇱',
                'keyCode':'UF729',
                'data': [
                    { 'keyCode': '\UF729', 'hfDesc': 'HOME', 'osxCmd': 'moveToBeginningOfDocument' },
                    { 'keyCode': '$\UF729', 'hfDesc': 'SHIFT + HOME', 'osxCmd': 'moveToBeginningOfDocumentAndModifySelection' },
                ]
            }
        }
    },

    'RD': {
        'R': {
            'RIGHT_ARROW': {
                'keySymbol': '→',
                'keyCode':'UF703',
                'data': [
                    { 'keyCode': '\UF703', 'hfDesc': 'RIGHTARROW', 'osxCmd': 'moveRight' },
                    { 'keyCode': '$\UF703', 'hfDesc': 'SHIFT + RIGHTARROW', 'osxCmd': 'moveRightAndModifySelection' },
                    { 'keyCode': '@\UF703', 'hfDesc': 'CMD + RIGHTARROW', 'osxCmd': 'moveToEndOfLine' },
                    { 'keyCode': '~\UF703', 'hfDesc': 'ALT + RIGHTARROW', 'osxCmd': 'moveWordRight' },
                    { 'keyCode': '$@\UF703', 'hfDesc': 'SHIFT + CMD + RIGHTARROW ', 'osxCmd': 'moveToEndOfLineAndModifySelection' },
                    { 'keyCode': '$~\UF703', 'hfDesc': 'SHIFT + ALT + RIGHTARROW ', 'osxCmd': 'moveWordRightAndModifySelection' },
                ]
            }
        },

        'D': {
            'DOWN_ARROW': {
                'keySymbol': '↓',
                'keyCode':'UF701',
                'data': [
                    { 'keyCode': '\UF701', 'hfDesc': 'DOWNARROW', 'osxCmd': 'moveDown' },
                    { 'keyCode': '$\UF701', 'hfDesc': 'SHIFT + DOWNARROW', 'osxCmd': 'moveDownAndModifySelection' },
                    { 'keyCode': '~\UF701', 'hfDesc': 'ALT + DOWNARROW', 'osxCmd': 'moveToEndOfParagraph' },
                    { 'keyCode': '$~\UF701', 'hfDesc': 'SHIFT + ALT + DOWNARROW', 'osxCmd': 'moveToEndOfParagraphAndModifySelection' },
                ]
            },
            'PAGE_DOWN': {
                'keySymbol': '⇟',
                'keyCode':'UF72D',
                'data': [
                    { 'keyCode': '\UF72D', 'hfDesc': 'PGDOWN', 'osxCmd': 'pageDown' },
                    { 'keyCode': '$\UF72D', 'hfDesc': 'SHIFT + PGDOWN', 'osxCmd': 'pageDownAndModifySelection' },
                ]
            },
            'END': {
                'keySymbol': '⇲',
                'keyCode':'UF72B',
                'data': [
                    { 'keyCode': '\UF72B', 'hfDesc': 'END', 'osxCmd': 'moveToEndOfDocument' },
                    { 'keyCode': '$\UF72B', 'hfDesc': 'SHIFT + END', 'osxCmd': 'moveToEndOfDocumentAndModifySelection' },
                ]
            }
        }
    }
};
// These are just a couple quick-reference nodes, providing quicker, mroe iterable access to their data
systemDefaults.defRefs = [systemDefaults.LU.L.LEFTARROW, systemDefaults.LU.U.UPARROW, systemDefaults.LU.U.PGUP, systemDefaults.LU.U.HOME, systemDefaults.RD.R.RIGHTARROW, systemDefaults.RD.D.DOWNARROW, systemDefaults.RD.D.PGDOWN, systemDefaults.RD.D.END];
systemDefaults.keyRefs = [systemDefaults.LU.L, systemDefaults.LU.U, systemDefaults.RD.R, systemDefaults.RD.D];

// Further cheatsy references (basically constructing all that data into <select> box <option> sets)
systemDefaults.LU.opts = [...availableMethods.LU.L, ...availableMethods.LU.U];
systemDefaults.LU.opts = "<option value=''>Nothing (disabled)</option><option>" + systemDefaults.LU.opts.join("</option><option>") + "</option>";
systemDefaults.RD.opts = [...availableMethods.RD.R, ...availableMethods.RD.D];
systemDefaults.RD.opts = "<option value=''>Nothing (disabled)</option><option>" + systemDefaults.RD.opts.join("</option><option>") + "</option>";

/**
 * @name                        generateSingleBinding
 * @type                        {function}
 * 
 * @description                 Generates the output UI html code for a single binding for a single key. Practically, this 
 *                              amounts to a single "row" in the usability layer. It includes each potential binding's 
 *                              modifier keys and desired behavior dropdown.
 * 
 * @todo                        Error handling.
 *
 * @param  {string} keyID       The stripped-down version of the keycode ALONE ('UF72B' instead of '$~\UF72B'). 
 *                              Saves headaches in parsing.
 * @param  {string} keyLabel    The literal key label, the unicode symbol one would find stamped into a keycap (ex. "←")
 * @param  {string} keyName     The human-readable, literal name of the key, as one would vocalize it (ex. "LEFT ARROW")
 * @param  {string} dirSet      The direction set (U, D, L, R) to which the key belongs. Used for loading the salient
 *                              <select> options sets (ex. "all leftwards options" and executing contra codes (ex. "UUDDLRLR")
 * @param  {string} record      Refers to both the individual bindings in systemDefaults, and ancient circular audio storage media 
 *                              (said to predate even the 'compact disc') made from "vinyl" (predating those eponymous streams)
 * @param  {number} instanceCt  Just an incrementer. Can't for the life of me remember why it's a parameter. Maybe was 
 *                              originally thinking recursion? Fauxameter? FIXME.
 * @return {string}             HTML code for a single binding in the UI (an individual <table>)
 */
const generateSingleBinding = (keyID, keyLabel, keyName, dirSet, record, instanceCt) => {
    let kCode              = record.keyCode,
        humanFriendlyKCode = "<b data-btn-text='" + (kCode.replace(keyID, keyLabel).replace("$", "⇧").replace("@", "⌘").replace("~", "⌥").split("").join("'></b><b data-btn-text='")) + "'></b>",
        osxCmd             = record.osxCmd,
        rulesObj           = document.getElementById("rules-for-" + keyID),
        behaviorOpts       = ('LU'.indexOf(dirSet) === -1) ? systemDefaults.RD.opts : systemDefaults.LU.opts;
        behaviorOpts       = behaviorOpts.replace(`>${osxCmd}</`,` selected>${osxCmd}</`);
    let HTMLOutput = `<table class="rule-scope" data-key="${keyID}" data-instance="${instanceCt}" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    ${humanFriendlyKCode}
                                    <span id="codeblock-${instanceCt}">"$~\\UF702" = moveWordLeftAndModifySelection:;</span>
                                </th>
                            </tr>
                        </thead>
                        <tr>
                            <td><input type="checkbox" id="modifier-set-${instanceCt}-${keyID}-SHF" name="modifier-set-${keyID}-SHF" class="modifier-keyset" value="$" ${(~kCode.indexOf('$')) ? "checked" : ""}><label for="modifier-set-${instanceCt}-${keyID}-SHF"> <span class="wide" data-keycap="Shift"></span> Shift</label></td>
                            <td><input type="checkbox" id="modifier-set-${instanceCt}-${keyID}-CMD" name="modifier-set-${keyID}-CMD" class="modifier-keyset" value="@" ${(~kCode.indexOf('@')) ? "checked" : ""}><label for="modifier-set-${instanceCt}-${keyID}-CMD"> <span data-keycap="⌘"></span> Cmd</label></td>
                            <td><input type="checkbox" id="modifier-set-${instanceCt}-${keyID}-ALT" name="modifier-set-${keyID}-ALT" class="modifier-keyset" value="~" ${(~kCode.indexOf('~')) ? "checked" : ""}><label for="modifier-set-${instanceCt}-${keyID}-ALT"> <span data-keycap="⌥"></span> Opt/Alt</label></td>
                            <td><input type="checkbox" id="modifier-set-${instanceCt}-${keyID}-CTL" name="modifier-set-${keyID}-CTL" class="modifier-keyset" value="^" ${(~kCode.indexOf('^')) ? "checked" : ""}><label for="modifier-set-${instanceCt}-${keyID}-CTL"> <span data-keycap="^"></span> Ctrl</label></td>
                            <td>
                                Desired behavior:<br>
                                <select id="behavior-set-${instanceCt}-${keyID}" name="behavior-set-${instanceCt}-${keyID}" class="rule-behaviors">
                                    ${behaviorOpts}
                                </select>
                            </td>
                            <td>
                                <button class='remove' alt='Remove This Keybinding' title='Remove This Keybinding' onclick='removeBinding(this, "RemoveDialog", "${instanceCt}", "${keyID}")'>⊖</button>
                                <button class='save' alt='Save This Keybinding' title='Save This Keybinding' onclick='saveBinding(this, "${instanceCt}", "${keyID}")'>✔︎</button>
                                <button class='undo' alt='Undo This Keybinding' title='Undo This Keybinding' onclick='revertBinding(this, "${instanceCt}", "${keyID}")'>⟲</button>
                            </td>
                        </tr>
                        
                      </table>`;

    if(null == rulesObj) {
      return HTMLOutput;
    } else {
      rulesObj.innerHTML = HTMLOutput + rulesObj.innerHTML;
    }
};

/**
 * @name                        generateAllBindingsForKey
 * @type                        {function}
 *
 * @description                 Generates the output UI html code for a ALL bindings for a single key. Practically, this 
 *                              amounts to a single "keyblock" matrix in the usability layer. It includes the key's label
 *                              ('da big keys'), the number of active bindings for the given key, and the 'Add Another ⊕' button
 *                              
 * @todo                        Error handling.
 *
 * @param  {string} keyID       The stripped-down version of the keycode ALONE ('UF72B' instead of '$~\UF72B'). 
 * @param  {string} keyLabel    The literal key label, the unicode symbol one would find stamped into a keycap (ex. "←")
 * @param  {string} keyName     The human-readable, literal name of the key, as one would vocalize it (ex. "LEFT ARROW")
 * @param  {string} bindingSet  The set of all active bindings for a given key contained within the systemDefaults object
 * @param  {string} dirSet      The direction set (U, D, L, R) to which the key belongs. Used for loading the salient
 * @param  {number} optionCount Fauxameter - Simply the number of default bindings for a given key within systemDefaults
 * @return {string}             HTML code for a ALL the bindings for a given key in the UI (an individual <section>)
 */
const generateAllBindingsForKey = (keyID, keyLabel, keyName, bindingSet, dirSet, bindingCount=bindingSet.length) => {
    instanceCt = 1;
    let HTMLOutput = `<section id="ruleset-key-${keyID}">
                        <input type="checkbox" id="enable-keyset-${keyID}" name="enable-keyset-${keyID}" class="enable-rule" value="1" checked><label for="enable-keyset-${keyID}"><span data-keycap="${keyLabel}" class="header"></span> ${keyName}</label></td>
                        <span class="rule-count" id="${keyID}-activeCount">${bindingCount}</span>
                        <div id="rules-for-${keyID}" class="interactive-form">`;
                        bindingSet.forEach(o=> { HTMLOutput += generateSingleBinding(keyID, keyLabel, keyName, dirSet, o, instanceCt); instanceCt++; });
    return HTMLOutput;
        //+ `<button id="append-button-${keyID}" class='append' alt="Add Another">⊕</button>
        //                  </div>
        //              </section>`;
};

/**
 * @name                        processRules
 * @type                        {function}
 *
 * @description                 Sweeps the UI and updates the various locations that give a shit about that sorta thing.
 *                              This includes: The individual binding labels and their code snippets, and the dataSets in 
 *                              the HTML used to store the various tidbits. It then sets the global dirty flag (used for
 *                              letting user know navigating away will dump their changes as well as enabling the Generate
 *                              Install Script button, since if its clean we don't care), and then calls updateBindingCt()
 *                              to set the visually-displayed number of active bindings to something human-useful.
 *                              
 * @todo                        Error handling.
 * @todo                        updateBindingCt()
 * 
 * @param  {bool}   updateSweep [DEFAULT: TRUE] Indicates current Sweep Mode: Initial Page Load (F) or OnChange Event (T)
 * @return {bool}               Returns true if successful. TODO: Return false+object in the case of a trapped error
 */
const processRules = (updateSweep=true) => {
    isDirtyForm        = updateSweep;
    d.getElementById('btn-generate-script').disabled = !isDirtyForm;
    let extantRuleSets = [...document.querySelectorAll('.rule-scope')];
    let datasetNameMod = (updateSweep) ? 'edited' : '';

    extantRuleSets.forEach(rs => {
        let rsModKeyId = rs.dataset.key;
        let rsModKeys  = rs.querySelectorAll('[checked]');
        let rsModRule  = rs.querySelector('select').value;
        if(null != rsModKeys){
            rsModKeys=([...rsModKeys].map(rsmk => rsmk.id.slice(-3)).join('+'));
            rsModKeys=(rsModKeys === '') ? rsModKeyId : rsModKeys + '+' + rsModKeyId;
            rs.dataset[datasetNameMod + 'combo'] = rsModKeys;
        }
        if(null != rsModRule){ rs.dataset[datasetNameMod + 'behavior'] = rsModRule; }
    });
    return true;
};



/**
 * @name                        showHideLabels
 * @type                        {function}
 *
 * @description                 Called onMouseDown event (ass all buttons must be, based on our UI) of the Show/Hide 
 *                              Default Bindings button in the UI
 *                              Simply flips the button's text then adds/removes the 'nolabels' class on the <html> tag
 *                              
 * @todo                        This just occurred to me: set a data-onText and data-offText on the button, then use the 
 *                              damn <html> class and the attr() in the ::after element to hotswap the text. Save 4 lines. 
 * @todo                        Error handling.
 *
 * @param  {htmObj} targetBtn   FAUXAMETER - A silly way of referencing the clicked button instead of `this`. It's handy, 
 *                              though, in that the title of the button (Show vs. Hide) also gives us a handy way of
 *                              storing the state variable of the button itself. TBH: I just wanted to see if it'd work.
 * @param  {bool}   showMode    FAUXAMETER - An equally silly way of ascertaining said session state for convenience
 * @return {bool}               Returns true if successful. TODO: Return false+object in the case of a trapped error
 */
const showHideLabels = (targetBtn=event.target, showMode=~targetBtn.innerText.indexOf('Show')) => {
    let htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = htmlTag.className.replace(/\s?nolabels\s?/gi, '');

    if(showMode){
        targetBtn.innerText=targetBtn.innerText.replace(/show/gi, 'Hide');
        return true;
    }
    
    targetBtn.innerText=targetBtn.innerText.replace(/hide/gi, 'Show');
    htmlTag.className += ' nolabels';
    return true;
};

/**
 * @name                        licenseDisplay
 * @type                        {function}
 *
 * @description                 Called onClick event of the Show License links button in the UI
 *                              Simply flips the button's text then adds/removes the 'nolabels' class on the <html> tag
 *                              
 * @todo                        Error handling.
 *
 * @return {bool}               Returns false so as not to propogate the behavior of the link
 */
const licenseDisplay = () => {
    window.scroll(0,0);
    let htmlTag   = document.getElementsByTagName('html')[0], 
        htmlClass = htmlTag.className;
    htmlTag.className = (~htmlClass.indexOf('license-visible')) ? htmlClass.replace(/\s?license-visible\s?/gi, '') : htmlClass + ' license-visible';
    return false;
};

const removeBinding = (sourceObj, diagID, instanceCt, keyID) => {
    h.className += " dialog-visible";
    d.getElementById(diagID).style.display='block';
    let okButton     = d.getElementById("remove-diag-T"),
        cancelButton = d.getElementById("remove-diag-F");
    const resolve = (diagID, result, data) => {
        d.getElementById(diagID).style.display='none';
        h.className = h.className.replace(" dialog-visible", "");
        var event = new CustomEvent('dialogClose', {detail: {dialogID:diagID, dialogValue:result, data:data}, bubbles:false});
        this.dispatchEvent(event);
    };
    okButton.onclick     = () => { resolve('RemoveDialog', true, {sourceObj, diagID, instanceCt, keyID}); };
    cancelButton.onclick = () => { resolve('RemoveDialog', false, {sourceObj, diagID, instanceCt, keyID}); };
};

const resolveDialog = (e, detail=e.detail, dialog=detail.dialogID, value=detail.dialogValue, data=detail.data) => {
    h.className = h.className.replace(/ dialog-visible/gi, "");
    switch(dialog){
        case 'RemoveDialog': // Removes a Key Binding
            value = value || false;
            let bindingToRemove=d.querySelector(`[data-key='${data.keyID}'][data-instance='${data.instanceCt}']`);
            bindingToRemove.className += ' programmatically-destroyed';
            if(value && bindingToRemove){ setTimeout(function(){ bindingToRemove.remove(); }, 750); }
        break;
    }
};

/**
 * @name                        init
 * @type                        {function}
 *
 * @description                 Grabs the HTML target, iterates over systemDefaults's keyRefs, parses 'em into each unique
 *                              keyblock (functionally each <section> tag), calling generateAllBindingsForKey for each, then
 *                              appends the returned HTML to the target.
 *                              
 * @todo                        Error handling.
 *
 * @return {bool}               Returns true if successful. TODO: Return false+object in the case of a trapped error
 */
const init = () => {
  const mainPanel = document.querySelector("body>main>article");
  
  systemDefaults.keyRefs.forEach(ref => {
    let defaultKeys = Object.entries(ref);
    let dirSet = (defaultKeys[0][0].charAt(0));
    defaultKeys.forEach(key => {
      mainPanel.innerHTML += generateAllBindingsForKey(key[1].keyCode, key[1].keySymbol, key[0].replace("_", " "), key[1].data, dirSet);
    });
  });

  processRules(false);
    w.addEventListener('dialogClose', resolveDialog);
};
init();
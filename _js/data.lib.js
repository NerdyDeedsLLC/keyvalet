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
systemDefaults.defRefs = [systemDefaults.LU.L.LEFTARROW, systemDefaults.LU.U.UPARROW, systemDefaults.LU.U.PGUP, systemDefaults.LU.U.HOME, systemDefaults.RD.R.RIGHTARROW, systemDefaults.RD.D.DOWNARROW, systemDefaults.RD.D.PGDOWN, systemDefaults.RD.D.END];
systemDefaults.keyRefs = [systemDefaults.LU.L, systemDefaults.LU.U, systemDefaults.RD.R, systemDefaults.RD.D];

console.group('data.libs.js loaded!');
console.info("availableMethods", availableMethods);
console.info('systemDefaults:', systemDefaults);
console.groupEnd();

var allLUMethods = [...availableMethods.LU.L, ...availableMethods.LU.U],
    allRDMethods = [...availableMethods.RD.R, ...availableMethods.RD.D];
    allLUMethods = "<option value=''>Nothing (disabled)</option><option>" + allLUMethods.join("</option><option>") + "</option>";
    allRDMethods = "<option value=''>Nothing (disabled)</option><option>" + allRDMethods.join("</option><option>") + "</option>";
    console.log(allLUMethods);

var currentRuleCount=2;
var keyCount=0;

const appendRule = (keyID, keyLabel, keyName, dirSet, record) => {
  console.log('appendRule', 'keyID:', keyID, 'keyLabel:', keyLabel, 'keyName:', keyName, 'dirSet:', dirSet, 'record:', record)
    
    let kId = keyID;
    let kCode = record.keyCode;
    let humanFriendlyKCode = "<b data-btn-text='" + (kCode.replace(kId, keyLabel).replace("$", "⇧").replace("@", "⌘").replace("~", "⌥").split("").join("'></b><b data-btn-text='")) + "'></b>";
    let osxCmd = record.osxCmd;
    let rulesObj = document.getElementById("rules-for-" + keyID);
    let behaviorOpts = ('LU'.indexOf(dirSet) === -1) ? allRDMethods : allLUMethods;
    behaviorOpts = behaviorOpts.replace(`>${osxCmd}</`,` selected>${osxCmd}</`);
    let HTMLOutput = `<table class="rule-scope" data-key="${kId}">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    ${humanFriendlyKCode}
                                    <span id="codeblock-1"></span>
                                </th>
                            </tr>
                        </thead>
                        <tr>
                            <td><input type="checkbox" id="modifier-set-${kId}-SHF" name="modifier-set-${kId}-SHF" class="modifier-keyset" value="$" ${(~kCode.indexOf('$')) ? "checked" : ""}><label for="modifier-set-${kId}-SHF"> <span class="wide" data-keycap="Shift"></span> Shift</label></td>
                            <td><input type="checkbox" id="modifier-set-${kId}-CMD" name="modifier-set-${kId}-CMD" class="modifier-keyset" value="@" ${(~kCode.indexOf('@')) ? "checked" : ""}><label for="modifier-set-${kId}-CMD"> <span data-keycap="⌘"></span> Cmd</label></td>
                            <td><input type="checkbox" id="modifier-set-${kId}-ALT" name="modifier-set-${kId}-ALT" class="modifier-keyset" value="~" ${(~kCode.indexOf('~')) ? "checked" : ""}><label for="modifier-set-${kId}-ALT"> <span data-keycap="⌥"></span> Opt/Alt</label></td>
                            <td><input type="checkbox" id="modifier-set-${kId}-CTL" name="modifier-set-${kId}-CTL" class="modifier-keyset" value="^" ${(~kCode.indexOf('^')) ? "checked" : ""}><label for="modifier-set-${kId}-CTL"> <span data-keycap="^"></span> Ctrl</label></td>
                            <td>
                                Desired behavior:<br>
                                <select id="behavior-${kId}" name="behavior-${kId}" class="rule-behaviors">
                                    ${behaviorOpts}
                                </select>
                            </td>
                            <td><button class='remove' alt='Remove This Keybinding' onclick='removeBinding(this)'>⊖</button></td>
                        </tr>
                        
                      </table>`;

    if(null == rulesObj) {
      return HTMLOutput;
    } else {
      rulesObj.innerHTML = HTMLOutput + rulesObj.innerHTML;
    }
};



const generateInteractiveRuleSet = (keyID, keyLabel, keyName, optionSet, dirSet, optionCount=optionSet.length) => {
    let HTMLOutput = `<section id="ruleset-key-${keyID}">
                        <input type="checkbox" id="enable-keyset-${keyID}" name="enable-keyset-${keyID}" class="enable-rule" value="1" checked><label for="enable-keyset-${keyID}"><span data-keycap="${keyLabel}" class="header"></span> ${keyName}</label></td>
                        <span class="rule-count" id="${keyID}-activeCount">${optionCount}</span>
                        <div id="rules-for-${keyID}" class="interactive-form">`;
                        optionSet.forEach(o=> { HTMLOutput += appendRule(keyID, keyLabel, keyName, dirSet, o); });
    return HTMLOutput + `<button id="append-button-${keyID}" class='append' alt="Add Another">⊕</button>
                        </div>
                      </section>`;
};

const establishDefaults = () => {
    let extantRuleSets = [...document.querySelectorAll('.rule-scope')];
    extantRuleSets.forEach(rs => {
        let rsModKeyId = rs.dataset.key;
        let rsModKeys  = rs.querySelectorAll('[checked]');
        let rsModRule  = rs.querySelector('select').value;
        if(null != rsModKeys){
            rsModKeys=([...rsModKeys].map(rsmk => rsmk.id.slice(-3)).join('+'));
            rsModKeys=(rsModKeys === '') ? rsModKeyId : rsModKeys + '+' + rsModKeyId;
            rs.dataset.combo = rsModKeys;
        }
        if(null != rsModRule){ rs.dataset.behavior = rsModRule; }
        console.log(rsModKeys, rsModRule);
    });
};

const createKeySet = () => {
  // const toTitleCase = str => str.replace(/\b\w+/g,(s)=> s.charAt(0).toUpperCase() + s.substr(1).toLowerCase());
  const mainPanel = document.querySelector("body>main>article");
  
  systemDefaults.keyRefs.forEach(ref => {
    let defaultKeys = Object.entries(ref);
    let dirSet = (defaultKeys[0][0].charAt(0));
    defaultKeys.forEach(key => {
      mainPanel.innerHTML += generateInteractiveRuleSet(key[1].keyCode, key[1].keySymbol, key[0].replace("_", " "), key[1].data, dirSet);
    });
  });

  establishDefaults();
};

createKeySet();

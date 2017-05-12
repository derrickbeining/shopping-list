'use strict';

var state = {
    shoppingList: []
};

function initiateShoppingListState () {
    var shoppingListItems = $(".shopping-item");
    for (var i = 0; i < shoppingListItems.length; i++) {
        if (shoppingListItems[i].classList.contains("shopping-item__checked")) {
            state.shoppingList.push(
                {
                    name: shoppingListItems[i].textContent,
                    checked: true
                });
        } else {
            state.shoppingList.push(
                {
                    name: shoppingListItems[i].textContent,
                    checked: false
                });
        }
    }
}

function addItemToState(state, item) {
    state.shoppingList.push(
        {
            name: item,
            checked: false
        });
}

function removeItemFromState(state, item) {
    var listFiltered = state.shoppingList.filter(function(el) {
        return el.name !== item;
    });
    state.shoppingList = listFiltered;
}

function toggleCheckedInState(state, item) {
    state.shoppingList.forEach(function(el) {
        console.log(state);
        if (el.name === item) {
            el.checked === true ? el.checked = false : el.checked = true;
        }
    })
}

function renderListToDOM(state, element) {
    var itemsHTML = state.shoppingList.map(function(el) {
        if (el.checked === true) {
            return '<li><span class="shopping-item shopping-item__checked">' + el.name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button> <button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
        } else {
            return '<li><span class="shopping-item">' + el.name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button> <button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
        }
    });
    element.html(itemsHTML);
}

function updateShoppingListOnCheck() {
    $(".shopping-list").on('click', '.shopping-item-toggle', function(event) {
        var checkedItem = event.currentTarget.parentElement.parentElement.querySelector(".shopping-item").textContent;
        toggleCheckedInState(state, checkedItem);
        renderListToDOM(state, $(".shopping-list"));
    })
}

function updateShoppingListOnDelete() {
    $(".shopping-list").on('click', '.shopping-item-delete', function(event) {
        var deletedItem = event.currentTarget.parentElement.parentElement.querySelector(".shopping-item").textContent;
        removeItemFromState(state, deletedItem);
        renderListToDOM(state, $(".shopping-list"));
    })
}

function updateShoppingListOnSubmit() {
    $("#js-shopping-list-form").submit(function(event) {
        event.preventDefault();
        addItemToState(state, $("#shopping-list-entry").val());
        renderListToDOM(state, $(".shopping-list"));
        $("#shopping-list-entry").val('');
    })
}


$(initiateShoppingListState());
$(updateShoppingListOnSubmit());
$(updateShoppingListOnDelete());
$(updateShoppingListOnCheck());
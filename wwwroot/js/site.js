


$(document).ready(function () {
    hide();

    document.getElementById("display-modal").addEventListener("click", function () {
        $('#modal-add-player').modal("show");
    });
    document.getElementById("checkLocal").addEventListener("change", function () {
        document.getElementById("checkRemote").checked = false;
    });
    //document.getElementById("checkRemote").addEventListener("change", function () {
    //    document.getElementById("checkLocal").checked = false;
    //});
    document.getElementById("Add-player").addEventListener("click", function () {
        addPlayer();
    });

    document.getElementById("StarGame").addEventListener("click", function () {
        startGame();
    });
    document.getElementById("startRemoteGame").addEventListener("click", function () {
        startRemoteGame();
    });

    document.getElementById("localGame-btn").addEventListener("click", function () {
        $('#create-Game-Sect').show();
        $('#localRemoteGames').hide();
    });
    document.getElementById("btn-endpoint").addEventListener("click", function () {
        changeEndpoint();
    });
    document.getElementById("btn-RemoteGame").addEventListener("click", function () {
        showGamesTable();
    });
    document.getElementById("joinRemoteGame").addEventListener("click", function () {
        addPlayerRemote();
    });
    $(document).on('submit', '#game-form', function () {
        createGame();
        return false;
    });

});
var playerAmount;
var endpoint = "https://contaminados.meseguercr.com/api/games/";
var localGameId;
var gameId;
var playerCount = 1;
var gameOwner;
var gamePassw;
var playersSelected = [];
var proposedGroup = [];
var round = 0;
var path;
var countSendPaths = 0;
var psychoWin = 0;
var psychoLost = 0;
var remotePlayersQ = 0;
var verifyLocalSend = 0
var status;

function getEndPoint() {
    return endpoint;
}

function hide() {
    $('#game-score').hide();
    $('#create-Game-Sect').hide();
    $('#container-game-cards').hide();
    $('#participants-list').hide();
    $('#remoteParticipants-list').hide();
    $('#row-remoteCardGame').hide();
    $('#gamesLobbyTable').hide();
}

function modalJoin(id) {
    gameId = id;
    remoteGameId = id;
    $('#modal-join-game').modal("show");

}

function rechargeGames() {
    LoadGames();
}


/*********** API METHODS *********/
//POST Authenticated
function createGame() {
    //var gameCreate = "create"
    if ($('#checkLocal').prop('checked')){
        if ($('#checkLocal').prop('checked')) {
            var ownerName = $('#ownerNameInput').val();
            var gameName = $('#gameNameInput').val();
            var gamePassword = $('#gamePassword').val();
            gameOwner = ownerName;
            gamePassw = gamePassword;
            $.ajax({
                url: endpoint,
                headers: { owner: ownerName, name: gameName },
                type: 'POST',
                data: JSON.stringify({ name: gameName, owner: ownerName, password: gamePassword }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (result) {
                    $('#create-Game-Sect').hide();
                    $('#participants-list').show();
                    //localRemoteGames
                    //$("#display-modal").hide();

                    gameId = result.data.id;
                    var html = "<li>" + ownerName + "</li>";
                    $('#part-list').html(html);
                    $('#ownerNameInput').val('');
                    $('#gameNameInput').val('');
                    $('#gamePassword').val('');

                },

                error: function (errorMessage) {
                    alert("error");
                    if (errorMessage.status == 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Client error',
                            showConfirmButton: false,
                            timer: 1800
                        });

                    }
                    if (errorMessage.status == 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Asset already exists',
                            showConfirmButton: false,
                            timer: 1800
                        });

                    }

                }
            });

        } 

    } 
    console.log(gameId, ownerName, gamePassword);
}
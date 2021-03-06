app.controller('PerguntaController', function ($scope, $http, PerguntaService) {
    $scope.save = function (pergunta) {
        if (!pergunta.id) {
            $scope.create(pergunta);
        } else {
            $scope.update(pergunta);
        }
    };
    $scope.edit = function (pergunta) {
        $scope.pergunta = pergunta;
    };
    $scope.create = function (pergunta) {
        PerguntaService.create(pergunta)
                .success(function (data, status) {
                    if (201 === status) {
                        $scope.perguntas.push(angular.copy(data));
                        $scope.clean();
                        alert('Sucesso');
                    }
                })
                .error(function (data, status) {
                    if (422 === status) {
                        alert(data.messages);
                    }
                });
    };
    $scope.readAll = function () {
        PerguntaService.readAll().success(function (perguntas) {
            $scope.perguntas = perguntas;
        });
    };
    $scope.update = function (pergunta) {
        PerguntaService.update(pergunta)
                .success(function (data, status) {
                    if (200 === status) {
                        $scope.clean();
                        alert('Sucesso');
                    }
                })
                .error(function (data, status) {
                    if (422 === status) {
                        alert(data.messages);
                    }
                });
    };
    $scope.delete = function (pergunta) {
        if (confirm('Deseja deletar esta pergunta de TODAS as enquetes?')) {
            PerguntaService.delete(pergunta).success(function (perguntadata, status) {
                if (204 === status) {
                    for (var index = 0; index < $scope.perguntas.length; index++) {
                        if ($scope.perguntas[index].id === pergunta.id) {
                            $scope.perguntas.splice(index, 1);
                            $scope.clean();
                        }
                    }
                }
            });
        }
    };
    $scope.clean = function () {
        $scope.pergunta = {id: null, pergunta: null};
    };
    $scope.addPerguntaToEnquete = function (pergunta) {
        if (!$scope.$parent.enquete) {
            alert('Escolha uma enquete!');
            return;
        }
        pergunta.selecionada = !pergunta.selecionada;
    };
    $scope.addRespostaToPergunta = function (resposta) {
        if (!$scope.pergunta || !$scope.pergunta.id) {
            alert('Escolha uma pergunta("Edit") para adicionar uma resposta a mesma!');
            return;
        }
        if ($scope.pergunta && !$scope.testIndexof($scope.pergunta.respostas, resposta)) {
            $scope.pergunta.respostas.push(resposta);
        }
    };
    $scope.removeRespostaFromPergunta = function (pergunta, resposta) {
        for (var index = 0; index < pergunta.respostas.length; index++) {
            if (pergunta.respostas[index].id === resposta.id) {
                pergunta.respostas.splice(index, 1);
            }
        }
    };
    // Listeners
    $scope.$on('addRespostaToPergunta', function (event, args) {
        $scope.addRespostaToPergunta(args.resposta);
    });
    $scope.$on('cleanAll', function () {
        $scope.clean();
        $scope.perguntas.forEach(function (pergunta) {
            pergunta.selecionada = false;
            pergunta.respostas = [];
        });
    });
    $scope.$on('selectPerguntasFromEnquete', function (event, args) {
        if ($scope.perguntas) {
            $scope.perguntas.forEach(function (perguntaFromScope) {
                perguntaFromScope.selecionada = false;
                perguntaFromScope.respostas = [];
                if (args.enquete && args.enquete.perguntas) {
                    args.enquete.perguntas.forEach(function (perguntaFromEnquete) {
                        if (perguntaFromScope.id === perguntaFromEnquete.id) {
                            perguntaFromScope.selecionada = true;
                            perguntaFromScope.respostas = angular.copy(perguntaFromEnquete.respostas);
                        }
                    });
                }
            });
        }
    });
});

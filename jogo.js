var rodada = 1;

var velha = true; 
//Criando as coordenadas do campo para o jogo da velha com vetores multidimensionais
var matrizJogo = Array(3);

matrizJogo['a'] = Array(3);
matrizJogo['b'] = Array(3);
matrizJogo['c'] = Array(3);

matrizJogo['a'][1] = 0;
matrizJogo['a'][2] = 0;
matrizJogo['a'][3] = 0;

matrizJogo['b'][1] = 0;
matrizJogo['b'][2] = 0;
matrizJogo['b'][3] = 0;

matrizJogo['c'][1] = 0;
matrizJogo['c'][2] = 0;
matrizJogo['c'][3] = 0;


$(document).ready( function(){

        $('#btnIniciarJogo').click( function(){
            //Validar Digitação
            if($('#entradaJogador1').val() == ""){
                alert("Apelido do Jogador 1 não preenchido");
                return false;
            }

            if($('#entradaJogador2').val() == ""){
                alert("Apelido do Jogador 2 não preenchido");
                return false;
            }

            //Exibir Apelidos
            $('#nomeJogador1').html($('#entradaJogador1').val());
            $('#nomeJogador2').html($('#entradaJogador2').val());

            //Controlar Visualição das Divs
            $('#paginaInicial').hide();
            $('#palcoJogo').show();

            $('.jogada').click( function(){
                var campoClicado = this.id;
                $('#'+ campoClicado).off();
                jogada(campoClicado);
            });
            //Controle da partida e pontuação
            function jogada(id){
                var icone = '';
                var ponto = 1;

                if ((rodada % 2) == 1){
                    icone = 'url("imagens/marcacao_1.png")';
                    ponto = -1;
                }

                else {
                    icone = 'url("imagens/marcacao_2.png")';
                    ponto = 1;
                }

                rodada++;

                $('#'+id).css('background-image', icone);

                var linhaColuna = id.split('-');

                matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto;

                verificaCombinacao();
                
            }

            function verificaCombinacao(){
                var pontos = 0;
                //Verificar pontuação na parte horizontal
                for(var i = 1;i <= 3; i++){
                    pontos = pontos + matrizJogo['a'][i];
                }
                vencedor(pontos);
                pontos = 0;
                for(var i = 1;i <= 3; i++){
                    pontos = pontos + matrizJogo['b'][i];
                }
                vencedor(pontos);

                pontos = 0;
                for(var i = 1;i <= 3; i++){
                    pontos = pontos + matrizJogo['c'][i];
                }
                vencedor(pontos);
                
                //Verificar pontuação na parte vertical
                for(var l = 1;l <= 3; l++){
                    pontos = 0;
                    pontos += matrizJogo['a'][l];
                    pontos += matrizJogo['b'][l];
                    pontos += matrizJogo['c'][l];

                    vencedor(pontos);
                }
                
                //Verificar pontuação na parte diagonal

                pontos = 0;
                pontos = matrizJogo['a'][1]+ matrizJogo['b'][2] + matrizJogo['c'][3];
                vencedor(pontos);

                pontos = 0;
                pontos = matrizJogo['c'][1]+ matrizJogo['b'][2] + matrizJogo['a'][3];
                vencedor(pontos);
                //Caso não houve um vencedor
                if (rodada > 9 && velha == true){
                    alert("Deu Velha !!!");
                    $('.jogada').off();
                    window.location.reload();
                }

            }

            function vencedor(pontos){
                
                if (pontos == -3){
                    var jogador1 = $('#entradaJogador1').val();
                    alert("Vitória do " + jogador1);
                    $('.jogada').off();
                    velha = false;
                    window.location.reload();
                }

                else if(pontos == 3){
                    var jogador2 = $('#entradaJogador2').val();
                    alert("Vitória do " + jogador2);
                    $('.jogada').off();
                    velha = false;
                    window.location.reload();
                }
            }

            
        });
});
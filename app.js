
 // main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {

    var myFacebookToken = 'EAACEdEose0cBAKbLATDMpuYtIdplJxbYKbscTecyjDZBKdE36oZBp2fqH8zKiPEd3sCmbsY0dz0eIqi6tkDNBKksYUaN4J9ZBAyIxl5NRtFpxd2ssmQp4gkmllWmhlfKRpnCXFMm41LlnU10fXfZCJrCt2vmUY1OyEZCYht9MYbCLcV4WlzpJa2aOyMs8Sb8SrSgc2jybFgZDZD';

    function getFacebookInfo(){

        $.ajax({url:'https://graph.facebook.com/me?fields=about,email,birthday,education,work,hometown,relationship_status,name,location,family,id&access_token='+myFacebookToken,

                success : function(response){
                    $(".facebookDetails").css("visibility", "visible");
                    $(".intro").css("visibility", "visible");
                    $(".Education").remove();
                    console.log(response);
                    $("#myName").text(response.name);
                    if(response.email!=undefined && response.email!=null)
                    {
                        $("#myEmail").text(response.email);
                    }
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
                    $("#myLocation").text(response.location.name);
                    
                    if(response.relationship_status!=undefined && response.relationship_status!=null)
                    {
                        $("#myRelationshipStatus").text(response.relationship_status);
                    }

                    $("#myBirthday").text(response.birthday);
                     
                    if(response.hometown.name!=undefined && response.hometown.name!=null)
                    {
                        $("#myHomeTown").text(response.hometown.name);
                    }
                    if(response.education!=undefined && response.education!=null)
                    {
                        var ed = response.education.length;// Total elements in education array
                        console.log(ed);
                        for(var i=0;i<ed;i++)
                        {
                            $('<div class="col-md-4 Education"><span>'+response.education[i].type+'</span> - <span>'+response.education[i].school.name+'</span></div>').insertBefore(".myWork");
                        }
                    }
                    
                    if(response.work!=undefined && response.work!=null)
                    {
                        $(".myWork").html('<p>I currently work at '+response.work[0].employer.name+'</p>');
                    }
                    
                },//Success function ends here


                error: function(error){
                    $(".error").html('<p>The error is :'+error.responseJSON.error.message+'</p>')
                }// Error function ends here
            }//end argument list 



        );// end ajax call 


    }// end get facebook info

    $("#facebookBtn").on('click',getFacebookInfo)
    //ends Facebook Info

    function goBack(){
        $(".facebookDetails").css("visibility", "hidden");
        $(".intro").css("visibility", "visible");
    }


    $("#Back").click(goBack);

    function getProfileFeed(){
        $.ajax({url:'https://graph.facebook.com/me?fields=posts&access_token='+myFacebookToken,
            success: function(response){
                $("#myProfileFeed").css('visibility','hidden');
                $("#profileBack").css('visibility','visible');
                $(".ProfileFeed").remove();
                for (var i = 0; i < response.posts.data.length; i++) {
                    console.log(response.posts.data.length);
                    console.log(response.posts);
                    if(response.posts.data[i].created_time!=undefined && response.posts.data[i].created_time!=null && response.posts.data[i].story!=undefined && response.posts.data[i].story!=null)
                    {
                            $('<div class="col-md-4 ProfileFeed"><span>'+response.posts.data[i].created_time+'</span> - <span>'+response.posts.data[i].story+'</span></div>').insertAfter(".myProfile");
                    }
                }
            },
            error: function(error){
                    $(".error").html('<p>The error is :'+error.responseJSON.error.message+'</p>')
                }//Error Function
        });
    }
//function call end
    $("#myProfileFeed").on('click',getProfileFeed)


    function getBack(){
        $("#myProfileFeed").css('visibility','visible');
        $(".ProfileFeed").remove();
        $("#profileBack").css('visibility','hidden');

    }

    $("#profileBack").click(getBack);
  });

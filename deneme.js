function main22()
{
  var array = [1,2,3,4,5,6,7,8,9];
  array.splice(3,1);
  var template = "(892 + 31X - 22X^333 * 31X^3)";
  template = addSup(template);
  var i = 0;
  var bool = false;

  while (bool == false)
  {
      if(isNumber(template.charAt(i)) == true)
      {
        bool = true;
      }
      else
      {
        i++;
      }
  }

  var arr1 = getNumber(template,i);
  i = arr1[arr1.length-1];

  bool = false;

  while(bool == false)
  {
    if(isSign(template.charAt(i)) == true)
    {
      var signImp = template.charAt(i);
      i += 2;
    }
    if(signImp != null && isNumber(template.charAt(i)) == true)
    {
      bool = true;
    }
    else
    {
        i++;
    }
  }

  var arr2 = getNumber(template, i);
  var aasdfa = 0;
}

function addSup(input)
{
  var newInput = "";
  for (var i = 0; i < input.length; i++)
  {
    if (input.charAt(i) == '^')
    {
      var bool = false;
      newInput += '<sup>';
      while (bool == false)
      {
        i++;
        if (!isNaN(parseInt(input.charAt(i), 10)))
        {
          newInput += input.charAt(i);
        }
        else
        {
          i--;
          bool = true;
        }
      }
      newInput += '</sup>';
    }
    else
    {
      newInput += input.charAt(i);
    }
  }
  return newInput;
}

function getNumber(template,i)
{
    var resultArray = [];
    var check = false;
    var indicator = 0;
    resultArray[indicator] = [];

    while(check == false)
    {
      if(resultArray[indicator][0] == null)
      {
        resultArray[indicator][0] = "";
      }
      if(resultArray[indicator][1] == null)
      {
        resultArray[indicator][1] = "";
      }

      if(template.charAt(i) == 'X' && template.charAt(i+1) == '^')
      {
        i += 2;
        var check2 = false;
        while (check2 == false)
        {
          if(isNumber(template.charAt(i)) == false)
          {
            check2 = true;
          }
          else
          {
            resultArray[indicator][1] += template.charAt(i);
            i++;
          }
        }
        i-=1;
      }
      else if(template.charAt(i) == 'X')
      {
        resultArray[indicator][1] = "1";
      }
      else if(isNumber(template.charAt(i)) == true)
      {
        resultArray[indicator][0] += template.charAt(i);
      }
      else if(isSign(template.charAt(i))==true)
      {
        resultArray[indicator][0] += template.charAt(i);
        resultArray[indicator][1] = "sign";
      }
      else if(template.charAt(i) == " ")
      {
        indicator +=1;
        resultArray[indicator] = [];
      }

      //end loop condition;
      if(template.charAt(i) == "(" || template.charAt(i) == ")")
      {
        check = true;
      }
      i++;
    }

    // eger powerOfX i undefindsa, 1inci elemente "0" ata.
    for(var j = 0; j < resultArray.length ; j++)
    {
      if(resultArray[j][1] == "")
      {
        resultArray[j][1] = "0";
      }
    }

    resultArray[resultArray.length] = i;
    return resultArray;
}
function isSign(character)
{
  var check = false;
  if(character == '+' || character == '*' || character == '-' || character == '/' )
  {
    check = true;
  }
  return check;
}

function isNumber(character)
{
  var check = false;
  if(character == '_' || character == '$'|| character == '.' || character == '0' || character == '1' || character == '2' || character == '3' || character == '4' || character == '5' || character == '6' || character == '7' || character == '8' || character == '9')
  {
    check = true;
  }
  return check;
}

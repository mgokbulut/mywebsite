var Stack = function()
{
  this.count = 0;
  this.storage = {};

  // Adds a value onto the end of the stack
  this.push = function(value)
  {
      this.storage[this.count] = value;
      this.count++;
  }

  // Removes and returns the value at the end of the stack
  this.pop = function()
  {
      if (this.count === 0)
      {
          return undefined;
      }

      this.count--;
      var result = this.storage[this.count];
      delete this.storage[this.count];
      return result;
  }

  this.size = function()
  {
      return this.count;
  }

  // Returns the value at the end of the stack
  this.peek = function()
  {
      return this.storage[this.count-1];
  }
}

var solutionSteps = function()
{
  this.question = "";
  this.stepsInOrder = [];
  this.i = 0;
  this.currentStep;
  this.lock = false;
  // Adds a value onto the end of the stack
  this.assignQuestion = function(input)
  {
    if(this.lock == true)
    {
      this.question = input;
      this.stepsInOrder[this.i] = this.question;
      this.i +=1;
    }
  }
  this.push = function(replacedStep)
  {
    if(this.lock == true)
    {
      this.question = this.question.replace(this.currentStep,replacedStep);
      this.stepsInOrder[this.i] = this.question;
      this.i += 1;
    }
  }
  this.directPush = function(input)
  {
    if(this.lock == true)
    {
      this.stepsInOrder[this.i] = input;
      this.i += 1;
    }
  }
  this.getCurrentStep = function(input)
  {
    if(this.lock == true)
    {
      this.currentStep = input;
    }
  }
  this.printToConsole = function()
  {
    for(var j = 0 ; j < this.stepsInOrder.length ; j++)
    {
      var temp = this.stepsInOrder[j];
      temp = temp.replace("$","/");
      temp = temp.replace("_","-");
      console.log(symbolToReal(temp));
    }
  }
  this.activate = function()
  {
    this.lock = true;
  }
}

function realToSymbol(string)
{
  string = string.replace('/','$');
  string = string.replace('-','_');
  return string;
}

function symbolToReal(string)
{
  string = string.replace('$','/');
  string = string.replace('_','-');
  return string;
}

steps = new solutionSteps();

function main22()
{
  try
  {
    setup();
  }
  catch(err)
  {
    console.log("setupta sıkıntı var");
  }
}

function setup()
{
	//Ax + By = C
	//Dx + Ey = F

  var check = false;
  var check2 = false;
  while(check == false)
  {
    while(check2 == false)
    {
      var abcANDnewtemplate1 = generateSimultaneousEquations1();
      var defANDnewtemplate2 = generateSimultaneousEquations2();
      var determinant = simplifyCoefficient("((" + abcANDnewtemplate1.simplified_a + " * " + defANDnewtemplate2.simplified_e + ")" + " - " + "(" + abcANDnewtemplate1.simplified_b + " * " + defANDnewtemplate2.simplified_d + "))"); //a*d - b*c;
      if(validation(determinant,3) == true){check2 = true;}
    }

    var solution = solveSimultaneousEquation(abcANDnewtemplate1.simplified_a,abcANDnewtemplate1.simplified_b,abcANDnewtemplate1.simplified_c,defANDnewtemplate2.simplified_d,defANDnewtemplate2.simplified_e,defANDnewtemplate2.simplified_f);
    if(validation(solution.x,1) == true &&  validation(solution.y,1) == true){check = true;}
    else{check2 = false;}
  }

  var equation1 = abcANDnewtemplate1.newtemplate1;
  var equation2 = defANDnewtemplate2.newtemplate2;
  steps.activate();
  steps.directPush("for the first equation:");
  steps.assignQuestion(equation1);
  steps.directPush("for coefficient of x:");
  simplifyCoefficient(abcANDnewtemplate1.a);
  steps.directPush("for coefficient of y:");
  simplifyCoefficient(abcANDnewtemplate1.b);
  steps.directPush("for the last bit:");
  simplifyCoefficient(abcANDnewtemplate1.c);

  steps.directPush("---------------------------------");

  steps.directPush("for the second equation:");
  steps.assignQuestion(equation2);
  steps.directPush("for coefficient of x:");
  simplifyCoefficient(defANDnewtemplate2.d);
  steps.directPush("for coefficient of y:");
  simplifyCoefficient(defANDnewtemplate2.e);
  steps.directPush("for the last bit:");
  simplifyCoefficient(defANDnewtemplate2.f);

  steps.directPush("---------------------------------");
  solveSimultaneousEquation(abcANDnewtemplate1.simplified_a,abcANDnewtemplate1.simplified_b,abcANDnewtemplate1.simplified_c,defANDnewtemplate2.simplified_d,defANDnewtemplate2.simplified_e,defANDnewtemplate2.simplified_f);

  steps.printToConsole();

  solution.x = solution.x.replace("$","/");
  solution.x = solution.x.replace("_","-");
  solution.y = solution.y.replace("$","/");
  solution.y = solution.y.replace("_","-");

  document.getElementById("questionText1").value = equation1;
  document.getElementById("questionText2").value = equation2;
  document.getElementById("valueOfX").value = solution.y;
  document.getElementById("valueOfY").value = solution.x;

}

function solveSimultaneousEquation(a,b,c,d,e,f)
{
  // treat the inputs as decimal number which is string.

  // cramer's rule;
  steps.directPush("to find value of x and y:");
  steps.directPush("Ax + By = C \nDx + Ey = F");
  steps.directPush("determinant = (A*E) - (B*D)");
  steps.assignQuestion(("((" + a + " * " + e + ")" + " - " + "(" + b + " * " + d + "))"));
  var determinant = simplifyCoefficient("((" + a + " * " + e + ")" + " - " + "(" + b + " * " + d + "))"); //a*d - b*c;
  steps.directPush("determinant = " + determinant);

  steps.directPush("-------------------------------------");

  var determinant = realToSymbol(determinant);
  var x = "";
  var y = "";
  if(determinant != '0')
  {
     steps.directPush("for x:");
     steps.directPush("x = (e*d - b*f)/determinant");
     steps.assignQuestion(("(((" + c + " * " + e + ")" + " - " + "(" + b + " * " + f + "))" + " / " + determinant + ")"));
     x =  simplifyCoefficient("(((" + c + " * " + e + ")" + " - " + "(" + b + " * " + f + "))" + " / " + determinant + ")"); //(e*d - b*f)/determinant;
     steps.directPush("x = " + x);

     steps.directPush("-------------------------------------");

     steps.directPush("for y:");
     steps.directPush("y = (a*f - e*c)/determinant");
     steps.assignQuestion(("(((" + a + " * " + f + ")" + " - " + "(" + c + " * " + d + "))" + " / " + determinant + ")"));
     y = simplifyCoefficient("(((" + a + " * " + f + ")" + " - " + "(" + c + " * " + d + "))" + " / " + determinant + ")");//(a*f - e*c)/determinant;
     steps.directPush("y = " + y);

     if(x == "0" || y == "0" || x.charAt(x.indexOf("/")+1) == '0' || y.charAt(y.indexOf("/")+1) == '0')
     {x = "10000";y="10000";}
  } else
  {
      x = "10000";// making sure that validation will return false so that the function will be called with different imputs.
      y = "10000";
      //"Cramer equations system: determinant is zero."
      //"there are either no solutions or many solutions exist."
  }

  /*

  var a1 = a;
  var y = "";
  var x = "";

  a = simplifyCoefficient("(" + a + " * " + d + ")");
  b = simplifyCoefficient("(" + b + " * " + d + ")");
  c = simplifyCoefficient("(" + c + " * " + d + ")");

  d = simplifyCoefficient("(" + d + " * " + a1 + ")");
  e = simplifyCoefficient("(" + e + " * " + a1 + ")");
  f = simplifyCoefficient("(" + f + " * " + a1 + ")");

  a = realToSymbol(a);
  b = realToSymbol(b);
  c = realToSymbol(c);
  d = realToSymbol(d);
  e = realToSymbol(e);
  f = realToSymbol(f);

  /*
  a=a*d;
  b=b*d;
  c=c*d;

  d=d*a1;
  e=e*a1;
  f=f*a1;
  */
  /*
  var afloat = toFloat(a);
  var dfloat = toFloat(d);
  var steps = 0;

  if((afloat<0 && dfloat >0) || (afloat>0 && dfloat<0))
  {
    y = simplifyCoefficient("((" + c + " + " + f + ")" + " / "+ "(" + b + " + " + e + "))");
    //y=(c+f)/(b+e);
  }
  if((afloat<0 && dfloat <0) || (afloat>0 && dfloat>0))
  {
    y = simplifyCoefficient("((" + c + " - " + f + ")" + " / "+ "(" + b + " - " + e + "))");
    //y=(c-f)/(b-e);
  }

  x = simplifyCoefficient("((" + c + " - " + "(" + b + " * " + y +")) / " + a + ")");
  //x=((c-(b*y))/a);

  */

  xAndy = {x,y}
  return xAndy;
}

function generateSimultaneousEquations1()
{
	var template1 = selectTemplate1();
	var newtemplate1 = "";
  var simplified_a = "";
  var simplified_b = "";
  var simplified_c = "";

  var check = false;

  while(check == false)
  {
    var a = selectCoefficient();
    if(validation(simplifyCoefficient(a),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var b = selectCoefficient();
    if(validation(simplifyCoefficient(b),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var c = selectCoefficient();
    if(validation(simplifyCoefficient(c),2) == true){check = true;}
  }
  //end of the validation

	for(var i = 0 ; i < template1.length ; i++)
	{
		if(template1.charAt(i) == 'A')
		{
			newtemplate1 = newtemplate1 + a;
		}
		else if(template1.charAt(i) == 'B')
		{
			newtemplate1 = newtemplate1 + b;
		}
		else if(template1.charAt(i) == 'C')
		{
			newtemplate1 = newtemplate1 + c;
		}
		else
		{
			newtemplate1 = newtemplate1 + template1.charAt(i);
		}
	}

  steps.assignQuestion(newtemplate1);
  simplified_a = simplifyCoefficient(a);
  simplified_b = simplifyCoefficient(b);
  simplified_c = simplifyCoefficient(c);
  var abcANDnewtemplate1 = {a, b, c, simplified_a, simplified_b, simplified_c, newtemplate1};
  return abcANDnewtemplate1;
}

function generateSimultaneousEquations2()
{
  var template2 = selectTemplate2();
  var newtemplate2 = "";
  var simplified_d = "";
  var simplified_e = "";
  var simplified_f = "";

  var check = false;

  while(check == false)
  {
    var d = selectCoefficient();
    if(validation(simplifyCoefficient(d),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var e = selectCoefficient();
    if(validation(simplifyCoefficient(e),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var f = selectCoefficient();
    if(validation(simplifyCoefficient(f),2) == true){check = true;}
  }
  //end of the validation
  for(var i = 0 ; i < template2.length ; i++)
	{
		if(template2.charAt(i) == 'D')
		{
			newtemplate2 = newtemplate2 + d;
		}
		else if(template2.charAt(i) == 'E')
		{
			newtemplate2 = newtemplate2 + e;
		}
		else if(template2.charAt(i) == 'F')
		{
			newtemplate2 = newtemplate2 + f;
		}
		else
		{
			newtemplate2 = newtemplate2 + template2.charAt(i);
		}
	}

  // buralara ekleme lazım alooo  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  steps.question = newtemplate2;
  simplified_d = simplifyCoefficient(d);
  simplified_e = simplifyCoefficient(e);
  simplified_f = simplifyCoefficient(f);

  var defANDnewtemplate2 = {d, e, f, simplified_d, simplified_e, simplified_f, newtemplate2};
  return defANDnewtemplate2;
}

function gcd(x, y)
{
  if ((typeof x !== 'number') || (typeof y !== 'number'))
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y)
  {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function simplifyCoefficient(template)
{
    calculations = calculationsOrder(template);

    // işlem sayısına göre sortla !____________
    //calculations.sort(function(a, b){return a.length - b.length});

    var sign = "";
    for(var i = 0 ; i < calculations.size() ; i++)
    {
      var temp = "";
      var firstNumber = "";
      var secondNumber = "";
      var check = false;
      for(var j = 0; (check == false) ; j++)
      {
        if(isNumber(calculations.storage[i].charAt(j)) == true)
        {
          firstNumber = firstNumber + calculations.storage[i].charAt(j);
        }
        else if (isSign(calculations.storage[i].charAt(j))==true)
        {
          check = true;
          sign = calculations.storage[i].charAt(j);
        }
      }
      var check2 = false;
      var x = j-1;
      for(; check2 == false ;x++)
      {
        if(isNumber(calculations.storage[i].charAt(x)) == true)
        {
          secondNumber = secondNumber + calculations.storage[i].charAt(x);
        }
        else if (calculations.storage[i].charAt(x) == ')')
        {
          check2 = true;
        }
      }

      var changeSymbols = function(input)
      {
        input = input.replace("$","/");
        input = input.replace("_","-");
        return input;
      }

      temp = makeCalculation(firstNumber, secondNumber, sign);
      var temp2 = calculations.storage[i];
      steps.directPush(temp2 + " = " + changeSymbols(temp));
      steps.getCurrentStep(temp2);
      steps.push(temp);
      for(var z = 0; z < calculations.size() ; z++)
      {
        var temp3 = calculations.storage[z];
        temp3 = temp3.replace(temp2.toString(), temp.toString());
        calculations.storage[z] = temp3.toString();
      }
    }

    //
    var result = calculations.storage[calculations.size() - 1];
    return result;
}

function calculationsOrder(template)
{
  var stackOfParentheses = new Stack();
  var stackOfIndexes = new Stack();
  var calculations = new Stack();

  for(var i = 0 ; i < template.length ; i++)
  {
    if(template.charAt(i) == "(")
    {
      stackOfParentheses.push(template.charAt(i));
      stackOfIndexes.push(i);
    }
    if(template.charAt(i) == ")")
    {
      calculations.push(template.substring(stackOfIndexes.peek(),i+1));
      stackOfIndexes.pop();
      stackOfParentheses.pop();
    }
  }
  return calculations;

  /*
  var openBracketsIndex = [];
  var closedBracketsIndex = [];
  var cordinatesOftheCalculations = [];
  var calculations = [];
  var currentOpenBrackets = 0;
  var currentClosedBrackets = 0;

  for(var i = 0 ; i < template.length ; i++)
  {
    var temp = template.charAt(i);
    if(temp == '(')
    {
      openBracketsIndex[currentOpenBrackets] = i;
      currentOpenBrackets ++;
    }
    else if(temp == ')')
    {
      closedBracketsIndex[currentClosedBrackets] = i;
      currentClosedBrackets ++;
    }
  }

  //putting indexes into array
  //(((8 + 5) + (7 + 6)) + (7+2)) + (8 +3)

  var check = false;
  var j = 0;
  while(check == false)
  {

    var greatest = 0;
    for(var z = 0 ; z <openBracketsIndex.length ; z++)
    {
      if(closedBracketsIndex[0]>openBracketsIndex[z])
      {
          greatest = openBracketsIndex[z];
      }
    }
    var firstCoordinate = greatest;
    var index = openBracketsIndex.indexOf(greatest);
    firstCoordinate = firstCoordinate.toString();
    var secondCoordinate = closedBracketsIndex[0];
    secondCoordinate = secondCoordinate.toString();
    cordinatesOftheCalculations[j] = "(" + firstCoordinate + " - " + secondCoordinate + ")";
    calculations[j] = template.substring(greatest,parseInt(secondCoordinate) + 1);
    // remove the bits
    openBracketsIndex.splice(index, 1);
    closedBracketsIndex.splice(0, 1);
    j++;

    if(openBracketsIndex.length == 0 && closedBracketsIndex.length == 0)
    {
      check = true;
    }

  }
  */
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

function makeCalculation(number1, number2, sign)
{
  // assuming number1 and 2 are string
  if(number1.indexOf('_') != -1)
  {
    number1 = number1.replace("_","-");
  }
  if(number2.indexOf('_') != -1)
  {
    number2 = number2.replace("_","-");
  }

  var number1DivisionIndex = number1.indexOf('$');
  var number2DivisionIndex = number2.indexOf('$');
  var numerator =
  {
    n1:"",
    n1Int:0,
    n2:"",
    n2Int:0,
  };
  var denominator =
  {
    d1:"",
    d1Int:0,
    d2:"",
    d2Int:0,
  };

  if(number1DivisionIndex != -1)
  {
    numerator.n1 = number1.substring(0,number1DivisionIndex);
    denominator.d1 = number1.substring(number1DivisionIndex+1,number1.length);
  }
  if(number2DivisionIndex != -1)
  {
    numerator.n2 = number2.substring(0,number2DivisionIndex);
    denominator.d2 = number2.substring(number2DivisionIndex+1,number2.length);
  }

  var product = "";
  var temp1 = 0;
  var temp2 = 0;
  var gcf = 0;

  if(sign == '*')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      temp1 = numerator.n1Int * numerator.n2Int;
      temp2 = denominator.d1Int * denominator.d2Int;
      gcf = gcd(temp2, temp1);
      temp1 /= gcf;
      temp2 /= gcf;

      if(temp2 <0)
      {
        temp1 *= -1;
        temp2 *= -1;
      }
      if(temp2 != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = temp2.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 = temp1 * numerator.n1Int;
      gcf = gcd(temp1,denominator.d1Int);
      temp1 /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        temp1 *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else{product = temp1.toString();}
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 = temp1 * numerator.n2Int;
      gcf = gcd(temp1,denominator.d2Int);
      temp1 /= gcf;
      denominator.d2Int /= gcf;

      if(denominator.d2Int <0)
      {
        temp1 *= -1;
        denominator.d2Int *= -1;
      }
      if(denominator.d2Int != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = denominator.d2Int.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      temp2 *= temp1;
      product = temp2.toString();
    }
  }
  else if(sign == '/')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      temp1 = numerator.n1Int * denominator.d2Int;
      temp2 = denominator.d1Int * numerator.n2Int;
      gcf = gcd(temp2, temp1);
      temp1 /= gcf;
      temp2 /= gcf;

      if(temp2 <0)
      {
        temp1 *= -1;
        temp2 *= -1;
      }
      if(temp2 != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = temp2.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 = temp1 * denominator.d1Int;
      gcf = gcd(temp1, numerator.n1Int);
      temp1 /= gcf;
      numerator.n1Int /= gcf;

      if(temp1 <0)
      {
        numerator.n1Int *= -1;
        temp1 *= -1;
      }
      if(temp1 != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = temp1.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 = temp1 * denominator.d2Int;
      gcf = gcd(temp1, numerator.n2Int);
      temp1 /= gcf;
      numerator.n2Int /= gcf;

      if(numerator.n2Int <0)
      {
        numerator.n2Int *= -1;
        temp1 *= -1;
      }
      if(numerator.n2Int != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = numerator.n2Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      gcf = gcd(temp1 , temp2);
      temp1 /= gcf;
      temp2 /= gcf;

      if(temp2 <0)
      {
        temp2 *= -1;
        temp1 *= -1;
      }
      if(temp2 != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = temp2.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
  }
  else if(sign == '-')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      numerator.n1Int *= denominator.d2Int;
      numerator.n2Int *= denominator.d1Int;
      denominator.d1Int *= denominator.d2Int;

      numerator.n1Int = numerator.n1Int - numerator.n2Int;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 *= denominator.d1Int;
      numerator.n1Int -= temp1;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 *= denominator.d2Int;
      temp1 -= numerator.n2Int;
      gcf = gcd(temp1,denominator.d2Int);
      temp1 /= gcf;
      denominator.d2Int /= gcf;

      if(denominator.d2Int <0)
      {
        temp1 *= -1;
        denominator.d2Int *= -1;
      }
      if(denominator.d2Int != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = denominator.d2Int.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      temp1 -= temp2;
      product = temp1.toString();
    }
  }
  else if(sign == '+')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      //
      numerator.n1Int *= denominator.d2Int;
      numerator.n2Int *= denominator.d1Int;
      denominator.d1Int *= denominator.d2Int;

      numerator.n1Int = numerator.n1Int + numerator.n2Int;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 *= denominator.d1Int;
      numerator.n1Int += temp1;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 *= denominator.d2Int;
      temp1 += numerator.n2Int;
      gcf = gcd(temp1,denominator.d2Int);
      temp1 /= gcf;
      denominator.d2Int /= gcf;

      if(denominator.d2Int <0)
      {
        temp1 *= -1;
        denominator.d2Int *= -1;
      }
      if(denominator.d2Int != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = denominator.d2Int.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      temp2 += temp1;
      product = temp2.toString();
    }
  }

  // changeing symbols;
  if(product.indexOf('-') != -1)
  {
    product = product.replace("-","_");
  }
  // changeing symbols;
  return product;
}

function validation(number,choice)
{
  //treat number as string
  var toFloat = function(decimal)
  {
    var float= 0.0;
    if(decimal.indexOf('/') != -1)
    {
    var number1 = parseInt(decimal.substring(0,decimal.indexOf('/')))
    var number2 = parseInt(decimal.substring(decimal.indexOf('/')+1, decimal.length));
    float = number1 / number2;
    }
    else
    {
    float = parseInt(decimal);
    }
    return float;
  }
  number = number.replace("$","/");
  number = number.replace("_","");
  number = number.replace("-","");
  var float = toFloat(number);
  if(choice == 0 || choice == 2)
  {
    if(float > 50.0 || float < -50.0 || float == 0){return false;}
  }

  if(choice == 0 ||choice == 2)
  {
    if(number.indexOf("/") != -1)
    {
      var temp1 = number.substring(0,number.indexOf("/"));
      var temp2 = number.substring(number.indexOf("/")+1,number.length);
      var intTemp2 = parseInt(temp2);
      if(intTemp2 > 20){return false;}
      if(temp1.length > 2){return false;}
      if(temp2.length > 2){return false;}
    }
    else
    {
      if(number.length>2){return false;}
    }
  }
  if(choice == 2)
  {
    var temp2 = number.substring(number.indexOf("/")+1,number.length);
    var intTemp2 = parseInt(temp2);
    if(intTemp2 > 10){return false;}
  }
  if(choice == 3)
  {
    if(number.indexOf("/") != -1)
    {
      var temp1 = number.substring(0,number.indexOf("/"));
      var temp2 = number.substring(number.indexOf("/")+1,number.length);
      var float = simplifyCoefficient("(" + temp1 + " / " + temp2 + ")");
      if(float > 50 || float < -51 || float == 0){return false;}
      if(temp1.length > 3){return false;}
      if(temp2.length > 3){return false;}
    }
    else
    {
      var integer = parseInt(number);
      if(integer > 50){return false;}
    }
  }
  if(choice == 1)
  {
    if(number.indexOf("/") != -1)
    {
      var temp1 = number.substring(0,number.indexOf("/"));
      var temp2 = number.substring(number.indexOf("/")+1,number.length);
      if(temp1.length > 3){return false;}
      if(temp2.length > 3){return false;}
    }
    else
    {
      if(number.length > 3){return false;}
    }
  }

  return true;
}

function selectSign()
{
  var sign = "";
  var choice = (Math.floor(Math.random() * 4)); // 0 to 4
  switch (choice)
  {
    case 0:
      sign = "+";
      break;
    case 1:
      sign = "-";
      break;
    case 2:
      sign = "/";
      break;
    case 3:
      sign = "*";
      break;
  }
  return sign;
}

function selectCoefficient()
{
	var option = Math.floor(Math.random() * 7); // 0 to 3
	var coefficient;
	switch(option)
	{
		case 0:
			coefficient = "(N S N)";
		break;

		case 1:
			coefficient = "((N S N) S  N)";
		break;

		case 2:
			coefficient = "(N S (N S N))";
		break;

		case 3:
			coefficient = "((N S N) S (N S N))";
		break;

		case 4:
			coefficient = "(((N S N) S (N S N)) S N)";
		break;

		case 5:
			coefficient = "(((N S N) S (N S N)) S (N S N))";
		break;

		case 6:
			coefficient = "((N S N) S ((N S N) S (N S N)))";
		break;
	}

	var newCoefficient = "";
	for(var i = 0 ; i < coefficient.length ; i++)
	{
    var number = (Math.floor(Math.random() * 15)) + 1;
    number = number.toString();
		if (coefficient.charAt(i) == 'N')
		{
			newCoefficient =newCoefficient + number;
		}
    else if(coefficient.charAt(i) == 'S')
    {
      newCoefficient =newCoefficient + selectSign();
    }
		else
		{
		newCoefficient = newCoefficient + coefficient.charAt(i);
		}
	}
	return newCoefficient;
}

function selectTemplate1()
{
	var option = Math.floor(Math.random() * 3); // 0 to 2
	var template;

	switch(option)
	{
		case 0:
			template = "Ax + By = C";
		break;

		case 1:
			template = "Ax + C = By";
		break;

		case 2:
			template = "C + By = Ax";
		break;
	}

	return template;
}

function selectTemplate2()
{
	var option = Math.floor(Math.random() * 3); // 0 to 2
	var template;

	switch(option)
	{
		case 0:
			template = "Dx + Ey = F";
		break;

		case 1:
			template = "Dx + F = Ey";
		break;

		case 2:
			template = "F + Ey = Dx";
		break;
	}

	return template;
}

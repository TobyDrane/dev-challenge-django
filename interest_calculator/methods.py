"""

Calculate the compound interest, given an:
- initial deposit (P)
- interest rate (r)
- monthly deposit value (pmt)
- duration in years (t)

"""
def calculate_compound_interest(initial, interest, monthly, duration):
  """
    Compound interest for principle deposit,
    returns: array[] length duration for every year
  """
  interest_decimal = interest / 100.0
  interest_multiplier = 1 + (interest_decimal / 12)
  output = []

  """ For every year in duration """
  for t in range(duration + 1):
    """ See formula - https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php """
    n = 12
    interest_decimal = interest / 100.0
    a = interest_decimal / n
    b = n * t

    I = initial * (1 + a) ** b
    J = monthly * (((1 + a) ** b - 1) / a)

    output.append(round(I + J, 2))

  return output

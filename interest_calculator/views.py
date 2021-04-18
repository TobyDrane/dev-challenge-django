from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

from interest_calculator import methods

@require_POST
@csrf_exempt
def interest_data(request):
    try:
        request_params = json.loads(request.body.decode('utf-8'))
    except ValueError:
        print(ValueError)
        return HttpResponseBadRequest('Internal Error')

    initial = request_params.get('initial')
    interest = request_params.get('interest')
    monthly = request_params.get('monthly')
    duration = request_params.get('duration')

    # Check for None values
    if initial is None or interest is None or monthly is None or duration is None:
        # Return bad response
        return HttpResponseBadRequest()
    
    total_interest = methods.calculate_compound_interest(
        initial, interest, monthly, duration)

    # Just an example! Should be replaced with real calculated data
    return JsonResponse({ 'result': total_interest })
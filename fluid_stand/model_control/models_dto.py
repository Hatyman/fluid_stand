from dataclasses import dataclass
import uuid
import datetime
from models import Session

@dataclass
class SetSessionRequestDTO:
    final_efficiency: float
    final_distribution_efficiency: float
    final_quality: float

    finished_at = datetime.datetime.today()


class SetTelemetryRequestDTO:
    efficiency: int
    distribution_efficiency = int
    quality = int

@dataclass
class SetTelemetryRequestDTO:
    telemetry_id = uuid.uuid4()
    measured_at = datetime.datetime.today()

    efficiency: int
    distribution_efficiency = int
    quality = int

    session: Session = Session.create_empty_session()

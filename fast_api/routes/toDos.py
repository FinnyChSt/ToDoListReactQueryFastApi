from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from routes.repository import Todos

router = APIRouter(prefix="/todos", tags=["todos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
class ToDoRequest(BaseModel):
    title:str = Field(min_length=3)
    description:str = Field(min_length=3)


@router.get("/")
async def get_all_todos(db: db_dependency):
    return db.query(Todos).all()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_todo(body: ToDoRequest, db: db_dependency ):
    todo_model = Todos(**body.model_dump())
    db.add(todo_model)
    db.commit()

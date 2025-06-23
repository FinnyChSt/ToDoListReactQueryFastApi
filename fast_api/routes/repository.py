from sqlalchemy import Column, String, Boolean, Integer

from database import Base


class Todos(Base):
    __tablename__ = "todos"
    id = Column(Integer,primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    is_complete = Column(Boolean, default=False)
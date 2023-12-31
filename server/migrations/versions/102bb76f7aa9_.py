"""empty message

Revision ID: 102bb76f7aa9
Revises: f663edad6e3f
Create Date: 2023-10-03 22:11:04.985412

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '102bb76f7aa9'
down_revision = 'f663edad6e3f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recipe_table', sa.Column('image_url', sa.String(length=1000), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('recipe_table', 'image_url')
    # ### end Alembic commands ###

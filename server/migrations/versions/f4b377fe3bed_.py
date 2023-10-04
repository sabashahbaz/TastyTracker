"""empty message

Revision ID: f4b377fe3bed
Revises: 102bb76f7aa9
Create Date: 2023-10-03 22:14:16.678884

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4b377fe3bed'
down_revision = '102bb76f7aa9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recipe_table', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'recipe_table', 'user_table', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'recipe_table', type_='foreignkey')
    op.drop_column('recipe_table', 'user_id')
    # ### end Alembic commands ###